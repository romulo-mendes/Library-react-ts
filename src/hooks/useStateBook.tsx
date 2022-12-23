import { useState } from "react";
import { Book } from "../models/book";

type useStateBookData = [book: Book, setBook: (parm: Book) => void];

const useStateBook = (): useStateBookData => {
	const [book, setBook] = useState<Book>({
		id: "",
		tittle: "",
		author: "",
		synopsis: "",
		systemEntryDate: "",
		image: "",
		genre: "",
		status: { description: "", isActive: true },
		rentHistory: [],
	});

	return [book, setBook];
};

export default useStateBook;
