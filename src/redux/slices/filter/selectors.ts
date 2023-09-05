import { RootState } from "../../store";

export const selectAllFilters = (state: RootState) => state.filter;

export const selectCurrentPage = (state: RootState) => state.filter.currentPage;
