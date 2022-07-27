import { configureStore } from "@reduxjs/toolkit";
import moviesReducer from "../features/moviesSlice";
import hehe from "../features/actions"

export const store = configureStore({
  reducer: {
    movies: moviesReducer,
    bruh: hehe
  }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
