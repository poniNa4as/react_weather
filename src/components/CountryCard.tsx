import { useDispatch } from "react-redux";
import { removeCard, Weather } from "../state/weatherSlice";

export function CountryCard({
  city,
  temperature,
  humidity,
  pressure,
  wind,
  weather,
  id,
  forecast,
}: Weather) {
  const dispatch = useDispatch();
  const getBackgroundClass = () => {
    switch (weather) {
      case "Clear":
        return "bg-[url('https://media.istockphoto.com/id/824800468/photo/sun-on-blue-sky-with-clouds.webp?a=1&b=1&s=612x612&w=0&k=20&c=Slo8PLbmJmONDCBRazEkAwLj1LEqLb8AGmG82uyW0uI=')]";
      case "Rain":
        return "bg-[url('https://plus.unsplash.com/premium_photo-1671229652411-4468b946b787?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8cmFpbnxlbnwwfHwwfHx8MA%3D%3D')]";
      case "Snow":
        return "bg-[url('https://media.istockphoto.com/id/629868088/pl/zdj%C4%99cie/scena-zimowa-opady-%C5%9Bniegu-na-rozmytym-tle.jpg?s=2048x2048&w=is&k=20&c=UojWg6M0TJe4GUjkKl4hYhYxv_ObMgw87_Ad2_1Grd8=')]";
      case "Clouds":
        return "bg-[url('https://plus.unsplash.com/premium_photo-1674834298045-e405bc99076b?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8Y2xvdWRzfGVufDB8fDB8fHww')]";
      default:
        return "bg-[url('https://images.unsplash.com/photo-1516907450399-41d50409e739?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTZ8fGNsb3Vkc3xlbnwwfHwwfHx8MA%3D%3D')]";
    }
  };

  return (
    <div
      className={` relative  max-w-sm rounded-lg shadow-lg p-6 m-4 ${getBackgroundClass()}`}
    >
      <button
        className="absolute top-2 right-2 text-gray-900 hover:text-gray-900 focus:outline-none"
        onClick={() => dispatch(removeCard(id))}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          className="w-6 h-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M6 18L18 6M6 6l12 12"
          />
        </svg>
      </button>
      <h2 className="text-2xl font-bold text-gray-900 mb-4">{city}</h2>
      <div className="text-gray-900">
        <p className="text-lg flex justify-between">
          <span>Temperature:</span>
          <span className="font-semibold whitespace-nowrap">
            {temperature}°C
          </span>
        </p>
        <p className="text-lg flex justify-between">
          <span>Humidity:</span>
          <span className="font-semibold whitespace-nowrap">{humidity}%</span>
        </p>
        <p className="text-lg flex justify-between">
          <span>Pressure:</span>
          <span className="font-semibold whitespace-nowrap">
            {pressure} hPa
          </span>
        </p>
        <p className="text-lg flex justify-between">
          <span>Wind:</span>
          <span className="font-semibold whitespace-nowrap">{wind} m/s</span>
        </p>
        <p className="text-lg flex justify-between">
          <span>Weather:</span>
          <span className="font-semibold whitespace-nowrap">{weather}</span>
        </p>
      </div>
      <div className="mt-4">
        <h3 className="text-xl font-semibold mb-2">5-Day Forecast</h3>
        {forecast.map((day, index) => (
          <div
            key={index}
            className="text-gray-900 text-sm flex justify-between"
          >
            <span>{new Date(day.dt_txt).toLocaleDateString()}</span>
            <span>{Math.floor(day.main.temp)}°C</span>
          </div>
        ))}
      </div>
    </div>
  );
}
