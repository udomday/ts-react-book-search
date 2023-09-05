import React from "react";

import styles from "./BookBlock.module.scss";
import { Book } from "../../redux/slices/books/types";
import { useNavigate } from "react-router-dom";

export const BookBlock: React.FC<Book> = ({
  id,
  authors,
  imageLinks,
  categories,
  title,
}) => {
  const nameAut = authors?.join(", ");
  const navigate = useNavigate();
  return (
    <div onClick={() => navigate(`book/${id}`)} className={styles.card}>
      <div className={styles.card__header}>
        <img width="70%" height={220} src={imageLinks?.thumbnail} />
      </div>
      <div className={styles.card__body}>
        <span className={styles.bottom_line}>{categories?.[0]}</span>
        <h4>{title}</h4>
        <span>{nameAut}</span>
      </div>
    </div>
  );
};
