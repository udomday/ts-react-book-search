import React from "react";

import style from "./Pagination.module.scss";
import { useAppDispatch } from "../../redux/store";
import { useSelector } from "react-redux";
import { selectCurrentPage } from "../../redux/slices/filter/selectors";
import { setSelectedPage } from "../../redux/slices/filter/slice";

export const Pagination: React.FC = () => {
  const currentPage = useSelector(selectCurrentPage);
  const dispatch = useAppDispatch();

  return (
    <div
      onClick={() => dispatch(setSelectedPage(currentPage + 32))}
      className={style.button}
    >
      <span>More</span>
    </div>
  );
};
