import React, { useEffect, useState } from "react";
import axios from "axios";

const TariffInquiry = () => {
  const [areas, setAreas] = useState([]);
  const [origins, setOrigins] = useState([]);
  const [destinations, setDestinations] = useState([]);

  const [selectedOrigin, setSelectedOrigin] = useState("");
  const [selectedDestination, setSelectedDestination] = useState("");

  const [weight, setWeight] = useState(2000);
  const [carrierType, setCarrierType] = useState("");

  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // گرفتن مناطق
  useEffect(() => {
    axios
      .get("https://core.tmcopars.ir/core/hotspot_area/?limit=10000")
      .then((res) => {
        const data = res.data?.results || [];

        setAreas(data);
        setOrigins(data);
      })
      .catch((err) => console.error(err));
  }, []);

  // فیلتر مقصدها
  useEffect(() => {
    if (!selectedOrigin) {
      setDestinations([]);
      return;
    }

    const filtered = areas.filter((item) => item.id !== Number(selectedOrigin));
    setDestinations(filtered);
  }, [selectedOrigin, areas]);

  const handleSubmit = (e) => {
    e.preventDefault();

    const w = parseFloat(weight);
    if (Number.isNaN(w) || w < 2000 || w > 10000) {
      setError("وزن باید بین 2000 تا 10000 باشد");
      return;
    }

    const payload = {
      origin_id: selectedOrigin,
      destination_id: selectedDestination,
      weight: w,
      carrier_type: carrierType,
    };

    setLoading(true);

    axios
      .post("/api/calculate/", payload)
      .then((res) => {
        setResult(res.data);
      })
      .catch(() => {
        setError("خطا در دریافت نتیجه");
      })
      .finally(() => setLoading(false));
  };

  return (
    <div className="w-full flex justify-center mt-20">
      <div className="w-11/12 md:w-2/3 lg:w-1/2 shadow-2xl border border-gray-200 rounded-3xl p-8 bg-white">

        <h5 className="font-bold text-lg text-center mb-8">
          استعلام کرایه حمل
        </h5>

        <form onSubmit={handleSubmit} className="space-y-6">

          {/* مبدا */}
          <div>
            <label className="block text-sm mb-2">مبدا</label>

            <select
              value={selectedOrigin}
              onChange={(e) => {
                setSelectedOrigin(e.target.value);
                setSelectedDestination("");
              }}
              className="w-full border rounded-xl px-4 py-2"
            >
              <option value="">انتخاب مبدا</option>

              {origins.map((item) => (
                <option key={item.id} value={item.id}>
                  {item.name}
                </option>
              ))}

            </select>
          </div>

          {/* مقصد */}
          <div>
            <label className="block text-sm mb-2">مقصد</label>

            <select
              value={selectedDestination}
              onChange={(e) => setSelectedDestination(e.target.value)}
              disabled={!selectedOrigin}
              className="w-full border rounded-xl px-4 py-2"
            >
              <option value="">
                {selectedOrigin ? "انتخاب مقصد" : "ابتدا مبدا را انتخاب کنید"}
              </option>

              {destinations.map((item) => (
                <option key={item.id} value={item.id}>
                  {item.name}
                </option>
              ))}

            </select>
          </div>

          {/* وزن */}
          <div>
            <label className="block text-sm mb-2">
              مقدار بار (کیلوگرم)
            </label>

            <input
              type="number"
              value={weight}
              min="2000"
              step="100"
              onChange={(e) => setWeight(e.target.value)}
              className="w-full border rounded-xl px-4 py-2"
            />
          </div>

          {/* نوع حامل */}
          <div>
            <label className="block text-sm mb-2">نوع حامل</label>

            <select
              value={carrierType}
              onChange={(e) => setCarrierType(e.target.value)}
              className="w-full border rounded-xl px-4 py-2"
            >
              <option value="">انتخاب نوع حامل</option>
              <option value="چادری">چادری</option>
              <option value="فلزی">فلزی</option>
              <option value="یخچالی">یخچالی</option>
            </select>
          </div>

          {error && (
            <div className="text-red-500 text-sm">
              {error}
            </div>
          )}

          <button
            type="submit"
            className="w-full bg-[#3C9BD8] text-white py-2 rounded-xl"
          >
            {loading ? "در حال محاسبه..." : "محاسبه کرایه"}
          </button>

        </form>

        {result && (
          <div className="mt-6 text-center">
            {result.tariff
              ? `${Number(result.tariff).toLocaleString()} تومان`
              : "تعرفه‌ای یافت نشد"}
          </div>
        )}
      </div>
    </div>
  );
};

export default TariffInquiry;
