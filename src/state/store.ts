import { configureStore } from "@reduxjs/toolkit";
import weatherReducer, { initialState } from "./weatherSlice";
import {
  loadStateFromLocalStorage,
  saveStateToLocalStorage,
} from "./localStorage";

const preloadedState = loadStateFromLocalStorage();

export const store = configureStore({
  reducer: {
    weather: weatherReducer,
  },
  preloadedState: {
    weather: preloadedState || initialState,
  },
});

store.subscribe(() => {
  saveStateToLocalStorage(store.getState().weather);
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
