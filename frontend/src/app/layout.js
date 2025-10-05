import "./globals.css";
import "./fonts.css"
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import AuthProvider from "@/providers/AuthProvider";

export const metadata = {
  title: "تمکو",
  description: "تمکو اولین پلتفرم ترکیبی حمل و نقل، راهکاری نوین برای شرکت ها و سازمان ها فراهم می کند تا فرایندهای لجستیکی خود را در محیط دیجیتال، ساده و شفاف مدیریت کنند. این پلتفرم امکان اتصال به ارائه کنندگان محتلف حمل و نقل زمینی، ریلی و هوایی را فراهم کرده و با داده های دقیق، تصمیم گیری هوشمنده تر را ممکن می سازد. ",
};

export default function RootLayout({ children }) {
  return (
    <html lang="fa" dir="rtl">
      <body>
        <AuthProvider>
          <Header />
          {children}
          <Footer />
        </AuthProvider>
      </body>
    </html>
  );
}
