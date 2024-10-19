import { WeatherState } from "./weatherSlice";

export const saveStateToLocalStorage = (state: WeatherState) => {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem("weatherState", serializedState);
  } catch (e) {
    console.error("Error saving state to localStorage", e);
  }
};

export const loadStateFromLocalStorage = (): WeatherState | undefined => {
  try {
    const serializedState = localStorage.getItem("weatherState");
    if (serializedState === null) {
      return undefined; // Возвращаем undefined, если данных нет
    }
    return JSON.parse(serializedState);
  } catch (e) {
    console.error("Error loading state from localStorage", e);
    return undefined;
  }
};
