import React from "react";
import { useParams } from "react-router-dom";
import { useAppDispatch } from "../../redux/store";
import { useSelector } from "react-redux";
import { selectAllBooks } from "../../redux/slices/books/selectors";
import { fetchOneBook } from "../../redux/slices/books/slice";
import { Status } from "../../redux/slices/books/types";

export const BookPage: React.FC = () => {
  const { id } = useParams();
  const dispatch = useAppDispatch();
  const { book, status } = useSelector(selectAllBooks);
  const flagRef = React.useRef<boolean>(false);

  React.useEffect(() => {
    if (flagRef) {
      id && dispatch(fetchOneBook(id));
    }

    flagRef.current = true;
  }, []);

  return (
    <div className="container">
      {status === Status.LOADING ? (
        <div className="loader">
          <h1>LOADING...</h1>
        </div>
      ) : (
        <div className="book_page">
          <div className="book_page__img">
            <img src={book?.imageLinks?.small} />
          </div>
          <div className="book_page__info">
            <span>{book?.categories?.[0]}</span>
            <h2>{book?.title}</h2>
            <span>{book?.authors.join(", ")}</span>
            <div>
              {book?.description
                ?.replace(/<(.|\n)*?>/g, "")
                ?.replace(/\s{2,}/g, " ") || "Description not found..."}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
