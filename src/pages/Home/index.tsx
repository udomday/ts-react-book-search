import React from "react";
import { BookBlock, Pagination } from "../../components";
import { selectAllBooks } from "../../redux/slices/books/selectors";
import { selectAllFilters } from "../../redux/slices/filter/selectors";
import { useSelector } from "react-redux";
import { useAppDispatch } from "../../redux/store";
import { Status } from "../../redux/slices/books/types";
import { fetchBooks, moreBooks } from "../../redux/slices/books/slice";

export const Home: React.FC = () => {
  const { books, status, totalItems } = useSelector(selectAllBooks);
  const { searchValue, category, currentPage, sortType } =
    useSelector(selectAllFilters);
  const dispatch = useAppDispatch();
  const flagRef = React.useRef<boolean>(false);

  React.useEffect(() => {
    if (flagRef.current) {
      dispatch(fetchBooks({ searchValue, category, currentPage, sortType }));
    }

    flagRef.current = true;
  }, [searchValue, category, sortType]);

  React.useEffect(() => {
    if (flagRef.current && currentPage != 0) {
      dispatch(moreBooks({ searchValue, category, currentPage, sortType }));
    }
  }, [currentPage]);

  return (
    <div className="container">
      {status === Status.LOADING ? (
        <div className="loader">
          <h1>LOADING...</h1>
        </div>
      ) : (
        <>
          <div className="totalFound">Found {totalItems} results</div>
          <div className="grid_wrapper">
            {books.map((el, index) => (
              <BookBlock
                key={index}
                description={el?.volumeInfo?.description}
                id={el?.id}
                authors={el?.volumeInfo?.authors}
                imageLinks={el?.volumeInfo?.imageLinks}
                categories={el?.volumeInfo?.categories}
                title={el.volumeInfo?.title}
              />
            ))}
          </div>
          <Pagination />
        </>
      )}
    </div>
  );
};
