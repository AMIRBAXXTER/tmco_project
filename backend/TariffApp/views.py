import re
import pandas as pd
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .utils import read_latest_tariff_excel, WEIGHT_CLASSES


class OriginListView(APIView):
    def get(self, request):
        df = read_latest_tariff_excel()
        if df is None:
            return Response({"detail": "هیچ فایل تعرفه‌ای وجود ندارد."},
                            status=status.HTTP_404_NOT_FOUND)

        required_columns = ["مبدا", "مقصد"]
        missing = [c for c in required_columns if c not in df.columns]
        if missing:
            return Response({"detail": f"ستون‌های {', '.join(missing)} در فایل وجود ندارند."},
                            status=status.HTTP_400_BAD_REQUEST)

        # ترکیب مبدا و مقصد در یک ستون
        all_cities = pd.concat([df["مبدا"], df["مقصد"]], ignore_index=True)

        # حذف مقادیر خالی، تبدیل به رشته، نرمال‌سازی فاصله‌ها و کاراکترهای اضافی
        normalized = (
            all_cities
            .dropna()
            .apply(lambda x: re.sub(r"\s+", " ", str(x)).strip())
            .apply(lambda x: x.replace("\u200c", ""))  # حذف نیم‌فاصله فارسی
        )

        # فقط رشته‌های غیرخالی و یکتا
        unique_origins = sorted(
            [city for city in normalized.unique().tolist() if city.strip() != ""]
        )

        return Response(unique_origins, status=status.HTTP_200_OK)


# ✅ مقاصد فقط بر اساس مبدا واقعی در فایل
class DestinationListView(APIView):
    def get(self, request):
        origin = request.query_params.get("origin")

        if not origin:
            return Response({"detail": "پارامتر origin الزامی است."},
                            status=status.HTTP_400_BAD_REQUEST)

        df = read_latest_tariff_excel()
        if df is None:
            return Response({"detail": "هیچ فایل تعرفه‌ای وجود ندارد."},
                            status=status.HTTP_404_NOT_FOUND)

        required_columns = {"مبدا", "مقصد"}
        if not required_columns.issubset(df.columns):
            return Response({"detail": "ستون‌های مبدا یا مقصد وجود ندارند."},
                            status=status.HTTP_400_BAD_REQUEST)

        # نرمال‌سازی داده‌ها برای حذف فاصله اضافی
        df["مبدا"] = df["مبدا"].apply(lambda x: re.sub(r"\s+", " ", str(x)).strip())
        df["مقصد"] = df["مقصد"].apply(lambda x: re.sub(r"\s+", " ", str(x)).strip())
        origin = re.sub(r"\s+", " ", origin).strip()

        # 🔹 مرحله ۱: همه‌ی شهرهایی که از مبدا انتخاب‌شده شروع می‌شوند
        forward_destinations = df.loc[df["مبدا"] == origin, "مقصد"].dropna().tolist()

        # 🔹 مرحله ۲: همه‌ی شهرهایی که به مبدا انتخاب‌شده ختم می‌شوند
        reverse_destinations = df.loc[df["مقصد"] == origin, "مبدا"].dropna().tolist()

        # 🔹 مرحله ۳: ترکیب و حذف موارد تکراری + حذف خود شهر از لیست
        all_destinations = sorted(set(forward_destinations + reverse_destinations))
        all_destinations = [d for d in all_destinations if d != origin]

        if not all_destinations:
            return Response({"detail": "هیچ مقصدی برای این شهر یافت نشد."},
                            status=status.HTTP_404_NOT_FOUND)

        return Response(all_destinations, status=status.HTTP_200_OK)


# ✅ محاسبه کرایه با بررسی مسیر معکوس
class TariffCalculateView(APIView):
    def post(self, request):
        origin = request.data.get("origin")
        destination = request.data.get("destination")
        weight = request.data.get("weight")

        if not all([origin, destination, weight]):
            return Response({"detail": "ارسال مبدا، مقصد و وزن الزامی است."},
                            status=status.HTTP_400_BAD_REQUEST)

        try:
            weight = float(weight)
        except ValueError:
            return Response({"detail": "مقدار وزن باید عددی باشد."},
                            status=status.HTTP_400_BAD_REQUEST)

        # تعیین کلاس وزنی
        selected_class = None
        for limit, cls in WEIGHT_CLASSES:
            if weight <= limit:
                selected_class = cls
                break
        else:
            selected_class = re.sub(r"\s+", "", WEIGHT_CLASSES[-1][1].strip())

        df = read_latest_tariff_excel()
        if df is None:
            return Response({"detail": "هیچ فایل تعرفه‌ای وجود ندارد."},
                            status=status.HTTP_404_NOT_FOUND)

        if selected_class not in df.columns:
            return Response({"detail": f"ستون مربوط به {selected_class} در فایل وجود ندارد."},
                            status=status.HTTP_400_BAD_REQUEST)

        # نرمال‌سازی مقادیر مبدا و مقصد
        df["مبدا"] = df["مبدا"].apply(lambda x: re.sub(r"\s+", " ", str(x)).strip())
        df["مقصد"] = df["مقصد"].apply(lambda x: re.sub(r"\s+", " ", str(x)).strip())
        origin = re.sub(r"\s+", " ", origin).strip()
        destination = re.sub(r"\s+", " ", destination).strip()

        # ابتدا تلاش برای یافتن مسیر مستقیم
        row = df[(df["مبدا"] == origin) & (df["مقصد"] == destination)]

        # اگر مسیر اصلی وجود ندارد → مسیر معکوس را امتحان کن
        if row.empty:
            row = df[(df["مبدا"] == destination) & (df["مقصد"] == origin)]
            if row.empty:
                return Response({"detail": "برای این جفت مبدا/مقصد هیچ تعرفه‌ای یافت نشد."},
                                status=status.HTTP_404_NOT_FOUND)

        # استخراج تعرفه
        tariff = row.iloc[0][selected_class] // 10
        if pd.isna(tariff) or float(tariff) == 0:
            tariff = None

        return Response({
            "origin": origin,
            "destination": destination,
            "tariff": tariff if tariff else None
        }, status=status.HTTP_200_OK)
