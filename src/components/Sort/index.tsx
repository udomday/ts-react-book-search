import React from "react";

import styles from "./Sort.module.scss";
import { useAppDispatch } from "../../redux/store";
import {
  setSelectedCategories,
  setSearchValue,
  setSelectedSortType,
  setSelectedPage,
} from "../../redux/slices/filter/slice";

const categories: string[] = [
  "all",
  "art",
  "biography",
  "computers",
  "history",
  "medical",
  "poetry",
];

const sortBy: string[] = ["relevance", "newest"];

export const Sort: React.FC = () => {
  const [searchValue, selectSearchValue] = React.useState<string>("");
  const [category, setCategory] = React.useState<string>("all");
  const [sortType, setSortType] = React.useState<string>("relevance");
  const dispatch = useAppDispatch();

  const setFiltersSetting = () => {
    dispatch(setSearchValue(searchValue));
    dispatch(setSelectedCategories(category));
    dispatch(setSelectedSortType(sortType));
    dispatch(setSelectedPage(0));
  };

  return (
    <div className={styles.root}>
      <div className={styles.root__search}>
        <input
          onChange={(el) => selectSearchValue(el.currentTarget.value)}
          onKeyDown={(el) => el?.key === "Enter" && setFiltersSetting()}
          placeholder="Введите название книги"
        />
        <button onClick={setFiltersSetting}>Find</button>
      </div>
      <div className={styles.root__sort}>
        <span>
          <label htmlFor="sort-select">Categories </label>
          <select
            name="categories"
            id="categories-select"
            value={category}
            onChange={(el) => setCategory(el.currentTarget.value)}
          >
            {categories.map((el, index) => (
              <option key={index} value={el}>
                {el}
              </option>
            ))}
          </select>
        </span>

        <span>
          <label htmlFor="sort-select">Sort by </label>
          <select
            name="sort"
            id="sort-select"
            value={sortType}
            onChange={(el) => setSortType(el.currentTarget.value)}
          >
            {sortBy.map((el, index) => (
              <option key={index} value={el}>
                {el}
              </option>
            ))}
          </select>
        </span>
      </div>
    </div>
  );
};
