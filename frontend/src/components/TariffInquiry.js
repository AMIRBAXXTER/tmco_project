import React, { useEffect, useState, useRef } from "react";
import axios from "axios";

const API_TOKEN = "5a9fa2cf5e1f243e4d3fcc0c448ee8c4aefd2d4a";

const TariffInquiry = () => {
  const [areas, setAreas] = useState([]);
  const [origins, setOrigins] = useState([]);
  const [destinations, setDestinations] = useState([]);

  const [selectedOrigin, setSelectedOrigin] = useState("");
  const [selectedDestination, setSelectedDestination] = useState("");

  const [originSearch, setOriginSearch] = useState("");
  const [destinationSearch, setDestinationSearch] = useState("");

  const [showOriginDropdown, setShowOriginDropdown] = useState(false);
  const [showDestinationDropdown, setShowDestinationDropdown] = useState(false);

  const [weight, setWeight] = useState(2000);
  const [carrierType, setCarrierType] = useState("");

  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [lastQueryKey, setLastQueryKey] = useState(null);
  const [error, setError] = useState("");

  const originRef = useRef();
  const destinationRef = useRef();

  useEffect(() => {
    axios
      .get("https://core.tmcopars.ir/core/hotspot_area/?limit=10000")
      .then((res) => {
        const data = res.data?.results || [];
        setAreas(data);
        setOrigins(data);
      });
  }, []);

  useEffect(() => {
    if (!selectedOrigin) {
      setDestinations([]);
      return;
    }
    const filtered = areas.filter(
      (item) => item.id !== Number(selectedOrigin)
    );
    setDestinations(filtered);
  }, [selectedOrigin, areas]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");

    const w = parseFloat(weight);
    if (Number.isNaN(w) || w > 10000) {
      setError("لطفاً وزن معتبر و کوچک‌تر از 10000 وارد کنید.");
      return;
    }

    const key = `${selectedOrigin}|${selectedDestination}|${w}`;
    if (lastQueryKey === key) return;

    setLoading(true);

    axios
      .get("https://core.tmcopars.ir/core/price/", {
        params: {
          source_id: selectedOrigin,
          destination_id: selectedDestination,
          weight: w,
        },
        headers: {
          accept: "application/json",
          Authorization: `Token ${API_TOKEN}`,
        },
      })
      .then((res) => {
        setResult(res.data);
        setLastQueryKey(key);
        setError("");
      })
      .catch((err) => {
        const apiError = err?.response?.data?.extra?.fields?.price?.[0];
        if (apiError) {
          setError("تعرفه‌ای برای این مسیر موجود نیست");
          setResult(null);
        } else {
          setError("خطایی رخ داد. لطفاً دوباره تلاش کنید.");
        }
      })
      .finally(() => setLoading(false));
  };

  const increaseWeight = () => {
    setWeight((prev) => String((parseFloat(prev) || 0) + 100));
    setResult(null);
  };

  const decreaseWeight = () => {
    setWeight((prev) =>
      String(Math.max(0, (parseFloat(prev) || 0) - 100))
    );
    setResult(null);
  };

  const isSubmitDisabled =
    loading ||
    !selectedOrigin ||
    !selectedDestination ||
    !weight ||
    Number.isNaN(parseFloat(weight)) ||
    parseFloat(weight) <= 0;

  return (
    <div className="w-full flex justify-center mt-20">
      <div className="w-11/12 md:w-2/3 lg:w-1/2 shadow-2xl mt-30 border border-gray-200 rounded-3xl p-8 bg-white relative">
        <h5 className="font-bold text-lg text-[#425466] text-center mb-8">
          استعلام کرایه حمل
        </h5>

        <form onSubmit={handleSubmit} className="space-y-6">

          {/* وزن با فلش سفارشی */}
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-2">
              مقدار بار (کیلوگرم)
            </label>

            <div className="relative flex items-center">
              <input
                type="number"
                step="100"
                className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#3C9BD8] outline-none appearance-none"
                value={weight}
                onChange={(e) => {
                  setWeight(e.target.value);
                  setResult(null);
                }}
                required
              />

              <div className="absolute left-2 flex flex-col">
                <button
                  type="button"
                  onClick={increaseWeight}
                  className="text-white bg-[#3C9BD8] hover:bg-[#3185c0] text-xs px-2 rounded-t-md"
                >
                  ▲
                </button>
                <button
                  type="button"
                  onClick={decreaseWeight}
                  className="text-white bg-[#3C9BD8] hover:bg-[#3185c0] text-xs px-2 rounded-b-md"
                >
                  ▼
                </button>
              </div>
            </div>
          </div>

          {/* نوع حامل */}
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-2">
              نوع حامل
            </label>
            <select
              className="appearance-none w-full px-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#3C9BD8] outline-none"
              value={carrierType}
              onChange={(e) => setCarrierType(e.target.value)}
            >
              <option value="">انتخاب نوع حامل</option>
              <option value="چادری">چادری</option>
              <option value="فلزی">فلزی</option>
              <option value="یخچالی">یخچالی</option>
            </select>
          </div>

          {/* مبلغ */}
          {result?.price && (
            <div className="bg-green-50 border border-green-200 rounded-xl p-4 text-center">
              <p className="text-gray-600 text-sm mb-1">مبلغ کرایه</p>
              <p className="text-2xl font-bold text-green-600">
                {Math.round(result.price / 10).toLocaleString("fa-IR")} تومان
              </p>
            </div>
          )}

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
      </div>
    </div>
  );
};

export default TariffInquiry;
