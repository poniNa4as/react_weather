import { FormEvent, useState } from "react";
import { fetchWeather } from "../state/weatherSlice";
import { useAppDispatch, useAppSelector } from "../state/hook";
import { CountryCard } from "./CountryCard";

export function FormItem() {
  const [city, setCity] = useState<string>("");
  const dispatch = useAppDispatch();
  const { weathers, loading, error } = useAppSelector((state) => state.weather);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (city) {
      dispatch(fetchWeather(city));
    }

    setCity("");
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-start pt-10">
      <h1 className="text-4xl font-extrabold mb-6 text-center text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-indigo-600 drop-shadow-lg">
        Weather Forecast
      </h1>
      <div className="relative w-full max-w-[90%] sm:max-w-[70%]">
        <form
          className="flex gap-4 justify-center mb-10"
          onSubmit={handleSubmit}
        >
          <input
            placeholder="City"
            className="border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200"
            value={city}
            onChange={(e) => setCity(e.target.value)}
          />
          <button
            type="submit"
            disabled={loading}
            className={`w-[120px] bg-blue-500 text-white font-bold py-2 px-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all duration-200 ${
              loading ? "cursor-not-allowed opacity-50" : "hover:bg-blue-700"
            }`}
          >
            {loading ? (
              <div className="flex items-center justify-center">
                <svg
                  className="animate-spin h-5 w-5 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                  ></path>
                </svg>
              </div>
            ) : (
              "Submit"
            )}
          </button>
        </form>
        {error ? (
          <div className="h-[20px] mb-2">
            <p className=" text-center text-red-500">Wrong input! Try again</p>
          </div>
        ) : (
          <div className="h-[20px] mb-2"></div>
        )}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 transition-transform duration-500 ease-in-out transform ">
          {weathers.map((item) => (
            <CountryCard key={item.id} {...item} />
          ))}
        </div>
      </div>
    </div>
  );
}
