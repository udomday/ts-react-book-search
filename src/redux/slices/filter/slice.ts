import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { FilterSliceState } from "./types";

const initialState: FilterSliceState = {
  searchValue: "",
  category: "all",
  currentPage: 0,
  sortType: "relevance",
};

export const FilterSlice = createSlice({
  name: "filter",
  initialState,
  reducers: {
    setSearchValue: (filter, actions: PayloadAction<string>) => {
      filter.searchValue = actions.payload;
    },
    setSelectedCategories: (filter, actions: PayloadAction<string>) => {
      filter.category = actions.payload;
    },
    setSelectedSortType: (filter, actions: PayloadAction<string>) => {
      filter.sortType = actions.payload;
    },
    setSelectedPage: (filter, actions: PayloadAction<number>) => {
      filter.currentPage = actions.payload;
    },
  },
});

export const {
  setSelectedCategories,
  setSelectedPage,
  setSearchValue,
  setSelectedSortType,
  // setFilters,
} = FilterSlice.actions;

export default FilterSlice.reducer;
