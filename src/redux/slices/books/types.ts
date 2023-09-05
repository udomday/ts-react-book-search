export enum Status {
  LOADING = "loading",
  SUCCESS = "success",
  ERROR = "error",
}

export type ImageType = {
  smallThumbnail: string;
  thumbnail: string;
  small: string;
  medium: string;
  large: string;
  extraLarge: string;
};

export type Book = {
  id: string;
  authors: string[];
  imageLinks: ImageType;
  categories: string[];
  title: string;
  description: string;
};

export interface BooksFetchType {
  id: string;
  volumeInfo: Book;
}

export interface BooksFetchPayLoad {
  items: BooksFetchType[];
  totalItems: number;
}

export interface BookSliceState {
  books: BooksFetchType[];
  book: Book | null;
  totalItems: number;
  status: Status;
}
