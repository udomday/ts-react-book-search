import { configureStore } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";
import BookReducer from "./slices/books/slice";
import FilterReducer from "./slices/filter/slice";

export const store = configureStore({
  reducer: {
    books: BookReducer,
    filter: FilterReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;

export const useAppDispatch = () => useDispatch<typeof store.dispatch>();
