/* eslint-disable no-mixed-spaces-and-tabs */
import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { Book } from '../models/book';
import { getAllBooks } from '../services/books';

export enum categoryEnum {
  TITTLE = 'tittle',
  AUTHOR = 'author',
  GENRE = 'genre',
  SYSTEMENTRYDATE = 'systemEntryDate',
}

type BooksProviderProp = {
  children: React.ReactNode;
};
type BookContextData = {
  search: string;
  setSearch: (param: string) => void;
  category: categoryEnum | undefined;
  setCategory: (param: categoryEnum | undefined) => void;
  filteredBooks: Book[] | undefined;
};

const BooksContext = createContext({} as BookContextData);

function BooksProvider({ children }: BooksProviderProp) {
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState<categoryEnum>();
  const [books, setBooks] = useState<Book[]>();

  useEffect(() => {
    const getBooks = async () => {
      const booksData = await getAllBooks();
      setBooks(booksData);
    };
    getBooks();
  }, []);

  const filteredBooks =
    search && category
      ? books?.filter((book: Book) =>
          book[category]
            .toString()
            .normalize('NFD')
            .replace(/[\u0300-\u036f]/g, '')
            .toLowerCase()
            .includes(search.toLowerCase())
        )
      : books;

  const providerData = useMemo(
    () => ({ search, setSearch, category, setCategory, filteredBooks }),
    [search, setSearch, category, setCategory, filteredBooks]
  );
  return <BooksContext.Provider value={providerData}>{children}</BooksContext.Provider>;
}

export const useBooks = (): BookContextData => {
  return useContext(BooksContext);
};

export default BooksProvider;
