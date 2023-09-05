import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import {
  Book,
  BookSliceState,
  BooksFetchPayLoad,
  BooksFetchType,
  Status,
} from "./types";
import { FilterSliceState } from "../filter/types";
import { useAppDispatch } from "../../store";
import { setSelectedPage } from "../filter/slice";

const apiKey = "AIzaSyBNNjK_Wgf-my9sF9Wg5zoree26dASzeFs";

//first fetch
export const fetchBooks = createAsyncThunk(
  "book/fetchBooks",
  async ({ searchValue, category, sortType }: FilterSliceState) => {
    const http = `https://www.googleapis.com/books/v1/volumes?q=${searchValue}+intitle:${category}+subject&orderBy=${sortType}&startIndex=0&maxResults=30&key=${apiKey}`;
    const { data } = await axios.get(http);
    return data;
  }
);

export const moreBooks = createAsyncThunk(
  "book/moreBooks",
  async ({
    searchValue,
    category,
    currentPage,
    sortType,
  }: FilterSliceState) => {
    const http = `https://www.googleapis.com/books/v1/volumes?q=${searchValue}+intitle:${category}+subject&orderBy=${sortType}&startIndex=${currentPage}&maxResults=30&key=${apiKey}`;
    const { data } = await axios.get(http);
    return data;
  }
);

export const fetchOneBook = createAsyncThunk(
  "book/fetchOneBook",
  async (id: string) => {
    const http = `https://www.googleapis.com/books/v1/volumes/${id}?key=${apiKey}`;
    const { data } = await axios.get(http);
    return data;
  }
);

const initialState: BookSliceState = {
  books: [],
  book: null,
  totalItems: 0,
  status: Status.LOADING,
};

export const BookSlice = createSlice({
  name: "book",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    //fetchBooks first
    builder.addCase(fetchBooks.pending, (state) => {
      state.status = Status.LOADING;
      state.books = [];
    });

    builder.addCase(
      fetchBooks.fulfilled,
      (state, action: PayloadAction<BooksFetchPayLoad>) => {
        state.totalItems = action.payload.totalItems;
        state.books = action.payload.items;
        state.status = Status.SUCCESS;
      }
    );

    builder.addCase(fetchBooks.rejected, (state) => {
      state.status = Status.ERROR;
      state.books = [];
    });

    //fetchBooks more
    builder.addCase(moreBooks.fulfilled, (state, action) => {
      state.totalItems = action.payload.totalItems;
      state.books.push(...action.payload.items);
    });

    //fetchOneBooks
    builder.addCase(fetchOneBook.pending, (state) => {
      state.status = Status.LOADING;
      state.book = null;
    });

    builder.addCase(
      fetchOneBook.fulfilled,
      (state, action: PayloadAction<BooksFetchType>) => {
        state.book = action.payload.volumeInfo;
        state.status = Status.SUCCESS;
      }
    );

    builder.addCase(fetchOneBook.rejected, (state) => {
      state.status = Status.ERROR;
      state.book = null;
    });
  },
});

export default BookSlice.reducer;
