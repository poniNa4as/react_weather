import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export interface Weather {
  id: number;
  city: string;
  temperature: string;
  humidity: string;
  pressure: string;
  wind: number;
  weather: string;
  forecast: WeatherForecast[];
}

export interface WeatherState {
  weathers: Weather[];
  loading: boolean;
  error: string | null;
}

export const initialState: WeatherState = {
  weathers: [],
  loading: false,
  error: null,
};

export interface WeatherForecast {
  dt_txt: string;
  main: {
    temp: number;
    humidity: number;
    pressure: number;
  };
  weather: {
    description: string;
    icon: string;
    main: string;
  }[];
  wind: {
    speed: number;
  };
}

const getFiveDayForecast = (forecastData: { list: WeatherForecast[] }) => {
  const dailyForecast = forecastData.list.filter((item) =>
    item.dt_txt.includes("12:00:00")
  );

  return dailyForecast.slice(0, 5);
};

export const fetchWeather = createAsyncThunk(
  "weather/fetchWeather",
  async (city: string) => {
    const geoResponse = await axios.get(
      `https://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=1&appid=abc3caeea54308e019ed3f33650cb997`
    );
    const { lat, lon } = geoResponse.data[0];

    const weatherResponse = await axios.get(
      `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=abc3caeea54308e019ed3f33650cb997`
    );
    const forecastResponse = await axios.get(
      `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=metric&appid=abc3caeea54308e019ed3f33650cb997`
    );
    const fiveDayForecast = getFiveDayForecast(forecastResponse.data);

    return {
      id: Date.now(),
      city: weatherResponse.data.name,
      temperature: weatherResponse.data.main.temp,
      humidity: weatherResponse.data.main.humidity,
      pressure: weatherResponse.data.main.pressure,
      wind: weatherResponse.data.wind.speed,
      weather: weatherResponse.data.weather[0].main,
      forecast: fiveDayForecast,
    };
  }
);

const weatherSlice = createSlice({
  name: "weather",
  initialState,
  reducers: {
    removeCard: (state, action) => {
      state.weathers = state.weathers.filter(
        (item) => item.id !== action.payload
      );
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchWeather.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchWeather.fulfilled, (state, action) => {
        state.loading = false;
        state.weathers.push(action.payload);
      })
      .addCase(fetchWeather.rejected, (state) => {
        state.loading = false;
        state.error = "Error";
      });
  },
});

export const { removeCard } = weatherSlice.actions;
export default weatherSlice.reducer;
