/* eslint-disable no-mixed-spaces-and-tabs */
import React, { createContext, useContext, useMemo, useState } from "react";
import { getAllBooks } from "../services/api";
import { Book } from "../models/book";

export enum categoryEnum {
	TITTLE = "tittle",
	AUTHOR = "author",
	GENRE = "genre",
	SYSTEMENTRYDATE = "systemEntryDate",
}

type BooksProviderProp = {
	children: React.ReactNode;
};
type BookContextData = {
	search: string;
	setSearch: (param: string) => void;
	category: categoryEnum | undefined;
	setCategory: (param: categoryEnum | undefined) => void;
	filteredBooks: Book[] | never[];
};

const BooksContext = createContext({} as BookContextData);

function BooksProvider({ children }: BooksProviderProp) {
	const [search, setSearch] = useState("");
	const [category, setCategory] = useState<categoryEnum>();
	const [books, setBooks] = useState([]);
	const [filteredBooks, setFilteredBooks] = useState([]);

	React.useEffect(() => {
		const getBooks = async () => setBooks(await getAllBooks());
		getBooks();
	}, []);

	React.useEffect(() => {
		setFilteredBooks(
			search && category
				? books.filter((book: Book) =>
						book[category].toLowerCase().includes(search.toLowerCase())
				  )
				: books
		);
	}, [search, category, books]);

	const providerData = useMemo(
		() => ({ search, setSearch, category, setCategory, filteredBooks }),
		[search, setSearch, category, setCategory, filteredBooks]
	);
	return (
		<BooksContext.Provider value={providerData}>{children}</BooksContext.Provider>
	);
}

export const useBooks = (): BookContextData => {
	return useContext(BooksContext);
};

export default BooksProvider;
