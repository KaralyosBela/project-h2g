import { configureStore } from "@reduxjs/toolkit";
import moviesReducer from "../features/moviesSlice";
import thunk from "redux-thunk";
import hehe from "../features/actions"

export const store = configureStore({
  reducer: {
    movies: moviesReducer,
    bruh: hehe
  },
  // middleware: [
  //   thunk
  // ]
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
