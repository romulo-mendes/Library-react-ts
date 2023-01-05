import { Book } from './../../models/book';
import { api } from '../api';

export const postBook = async (book: Book) => {
  const response = await api.post(`books`, book);
  return response.data;
};

export const getAllBooks = async (): Promise<Book[]> => {
  const response = await api.get(`books`);
  return response.data;
};

export const getBook = async (bookId: string): Promise<Book> => {
  const response = await api.get(`books/${bookId}`);
  return response.data;
};

export const editBook = async (bookId: string, book: Book) => {
  const response = await api.put(`books/${bookId}`, book);
  return response.data;
};
