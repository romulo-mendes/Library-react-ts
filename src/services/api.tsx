import axios from "axios";
import { Book } from "../models/book";

export const api = axios.create({
	baseURL: "http://localhost:3000/",
});

export const getUser = async (email: string, password: string) => {
	try {
		const response = await api.get(`login?email=${email}&password=${password}`);
		return Promise.resolve(response.data);
	} catch (error) {
		return Promise.reject(error);
	}
};

export const postBook = async (book: Book) => {
	try {
		const response = await api.post(`books`, book);
		return response.data;
	} catch (error) {
		console.error(error);
	}
};

export const getAllBooks = async () => {
	try {
		const response = await api.get(`books`);
		return Promise.resolve(response.data);
	} catch (error) {
		return Promise.reject(error);
	}
};

export const getBook = async (bookId: string) => {
	try {
		const response = await api.get(`books/${bookId}`);
		return Promise.resolve(response.data);
	} catch (error) {
		return Promise.reject(error);
	}
};
