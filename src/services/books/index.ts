import { Book } from "./../../models/book";
import { api } from "../api";

export const postBook = async (book: Book) => {
	try {
		const response = await api.post(`books`, book);
		return response.data;
	} catch (error) {
		console.error(error);
	}
};
