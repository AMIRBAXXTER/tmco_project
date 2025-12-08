import React, { useEffect, useState } from "react";
import axios from "axios";
import { Combobox } from "@headlessui/react";

const TariffInquiry = () => {
  const [origins, setOrigins] = useState([]);
  const [destinations, setDestinations] = useState([]);

  const [selectedOrigin, setSelectedOrigin] = useState("");
  const [selectedDestination, setSelectedDestination] = useState("");
  const [weight, setWeight] = useState("");
  const [carrierType, setCarrierType] = useState("");

  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [lastQueryKey, setLastQueryKey] = useState(null);
  const [error, setError] = useState("");

  // دریافت لیست مبداها
  useEffect(() => {
    let alive = true;
    axios
      .get("/api/origins/")
      .then((res) => {
        if (alive) setOrigins(res.data || []);
      })
      .catch((err) => console.error(err));

    return () => (alive = false);
  }, []);

  // دریافت مقاصد با تغییر مبدا
  useEffect(() => {
    if (selectedOrigin) {
      let alive = true;

      axios
        .get(`/api/destinations/?origin=${encodeURIComponent(selectedOrigin)}`)
        .then((res) => {
          if (alive) setDestinations(res.data || []);
        })
        .catch((err) => console.error(err));

      return () => (alive = false);
    } else {
      setDestinations([]);
    }
  }, [selectedOrigin]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");

    const w = parseFloat(weight);
    if (Number.isNaN(w) || w <= 2000 || w > 10000) {
      setError("لطفاً وزن معتبر بزرگ‌تر از 2000 و کوچک‌تر از 10000 وارد کنید.");
      return;
    }

    const currentQuery = {
      origin: selectedOrigin,
      destination: selectedDestination,
      weight: w,
      carrier_type: carrierType,
    };

    const key = `${currentQuery.origin}|${currentQuery.destination}|${currentQuery.weight}`;

    if (lastQueryKey === key) return;

    setLoading(true);

    axios
      .post("/api/calculate/", currentQuery)
      .then((res) => {
        setResult(res.data);
        setLastQueryKey(key);
      })
      .catch((err) => {
        console.error(err);
        setError("خطایی رخ داد. لطفاً دوباره تلاش کنید.");
      })
      .finally(() => setLoading(false));
  };

  const isSubmitDisabled =
    loading ||
    !selectedOrigin ||
    !selectedDestination ||
    !weight ||
    Number.isNaN(parseFloat(weight));

  return (
    <div className="w-full flex justify-center mt-20">
      <div className="w-11/12 md:w-2/3 lg:w-1/2 shadow-2xl mt-30 border border-gray-200 rounded-3xl p-8 bg-white relative">
        <h5 className="font-bold text-lg text-[#425466] text-center mb-8">
          استعلام کرایه حمل
        </h5>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* مبدا */}
          <div className="relative">
            <label className="block text-sm font-medium text-gray-600 mb-2">
              مبدا
            </label>

            <Combobox value={selectedOrigin} onChange={(v) => {
              setSelectedOrigin(v);
              setSelectedDestination(""); // ریست مقصد
            }}>
              <div className="relative">
                <Combobox.Input
                  className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#3C9BD8] outline-none"
                  placeholder="مبدا را تایپ کنید..."
                  onChange={(e) => setSelectedOrigin(e.target.value)}
                  displayValue={(v) => v}
                />

                {origins.length > 0 && (
                  <Combobox.Options className="absolute mt-1 max-h-60 w-full overflow-auto rounded-xl bg-white shadow-lg z-50 border border-gray-200">
                    {origins
                      .filter((item) =>
                        item.toLowerCase().includes(selectedOrigin.toLowerCase())
                      )
                      .map((item, i) => (
                        <Combobox.Option
                          key={i}
                          value={item}
                          className={({ active }) =>
                            `cursor-pointer select-none px-4 py-2 ${
                              active ? "bg-blue-100" : ""
                            }`
                          }
                        >
                          {item}
                        </Combobox.Option>
                      ))}
                  </Combobox.Options>
                )}
              </div>
            </Combobox>
          </div>

          {/* مقصد */}
          <div className="relative">
            <label className="block text-sm font-medium text-gray-600 mb-2">
              مقصد
            </label>

            <Combobox value={selectedDestination} onChange={setSelectedDestination}>
              <div className="relative">
                <Combobox.Input
                  disabled={!selectedOrigin}
                  className={`w-full px-4 py-2 border border-gray-300 rounded-xl outline-none ${
                    selectedOrigin ? "focus:ring-2 focus:ring-[#3C9BD8]" : "bg-gray-100"
                  }`}
                  placeholder={
                    selectedOrigin ? "مقصد را تایپ کنید..." : "ابتدا مبدا را انتخاب کنید"
                  }
                  onChange={(e) => setSelectedDestination(e.target.value)}
                  displayValue={(v) => v}
                />

                {selectedOrigin && destinations.length > 0 && (
                  <Combobox.Options className="absolute mt-1 max-h-60 w-full overflow-auto rounded-xl bg-white shadow-lg z-50 border border-gray-200">
                    {destinations
                      .filter((item) =>
                        item
                          .toLowerCase()
                          .includes(selectedDestination.toLowerCase())
                      )
                      .map((item, i) => (
                        <Combobox.Option
                          key={i}
                          value={item}
                          className={({ active }) =>
                            `cursor-pointer select-none px-4 py-2 ${
                              active ? "bg-blue-100" : ""
                            }`
                          }
                        >
                          {item}
                        </Combobox.Option>
                      ))}
                  </Combobox.Options>
                )}
              </div>
            </Combobox>
          </div>

          {/* وزن */}
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-2">
              مقدار بار (کیلوگرم)
            </label>
            <input
              type="number"
              min="0"
              step="any"
              className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#3C9BD8] outline-none"
              placeholder="مثلاً 1500"
              value={weight}
              onChange={(e) => setWeight(e.target.value)}
              required
            />
          </div>

          {/* نوع حامل */}
          <div className="relative">
            <label className="block text-sm font-medium text-gray-600 mb-2">
              نوع حامل
            </label>

            <select
              className="appearance-none w-full px-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#3C9BD8] outline-none pr-10"
              value={carrierType}
              onChange={(e) => setCarrierType(e.target.value)}
            >
              <option value="">انتخاب نوع حامل</option>
              <option value="چادری">چادری</option>
              <option value="فلزی">فلزی</option>
              <option value="تانکری">تانکری</option>
              <option value="یخچالی">یخچالی</option>
            </select>
          </div>

          {error && (
            <div className="text-red-600 text-sm bg-red-50 rounded-lg p-3">
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={isSubmitDisabled}
            className={`w-full text-white font-semibold py-2 rounded-xl transition-all duration-200 ${
              isSubmitDisabled
                ? "bg-gray-300 cursor-not-allowed"
                : "bg-[#3C9BD8] hover:bg-[#3185c0]"
            }`}
          >
            {loading ? "در حال محاسبه..." : "محاسبه کرایه"}
          </button>
        </form>

        {/* نمایش نتیجه */}
        <div className="border-t border-gray-200 pt-6 mt-6">
          <h6 className="font-semibold text-[#425466] text-center">
            نتیجه استعلام
          </h6>

          {loading && (
            <p className="text-center text-gray-500 mt-2">
              در حال دریافت نتیجه...
            </p>
          )}

          {!loading && result ? (
            <div className="bg-gray-50 rounded-xl p-4 text-center mt-3">
              {result.tariff !== null && result.tariff !== undefined ? (
                <p className="font-bold text-3xl text-[#3C9BD8]">
                  {Number(result.tariff).toLocaleString()} تومان
                </p>
              ) : (
                <p className="font-bold text-xl text-[#d83c3c]">
                  تعرفه‌ای برای این مسیر یافت نشد
                </p>
              )}

              {result.note && (
                <p className="text-sm text-gray-500 mt-2">{result.note}</p>
              )}
            </div>
          ) : (
            !loading && (
              <p className="text-center text-gray-400 text-sm mt-2">
                نتیجه‌ای هنوز وجود ندارد.
              </p>
            )
          )}
        </div>
      </div>
    </div>
  );
};

export default TariffInquiry;
