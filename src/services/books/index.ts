import { allRentType, Book, bookStatus, rentHistory } from './../../models/book';
import { api } from '../api';

export const postBook = async (book: Book) => {
  const response = await api.post(`book`, book);
  return response.data;
};

export const getAllBooks = async (): Promise<Book[]> => {
  const response = await api.get(`books`);
  return response.data;
};

export const getBook = async (bookId: string): Promise<Book> => {
  const response = await api.get(`book/${bookId}`);
  return response.data;
};

export const editBook = async (bookId: string, book: Book) => {
  const response = await api.put(`book/${bookId}`, book);
  return response.data;
};

export const lentBook = async (bookId: string, rent: rentHistory) => {
  const response = await api.put(`book/${bookId}/rent`, rent);
  return response.data;
};

export const returnLentBook = async (bookId: string, rent: rentHistory) => {
  const response = await api.patch(`book/${bookId}/rent`, rent);
  return response.data;
};

export const getAllRent = async (): Promise<allRentType[]> => {
  const response = await api.get(`books/rent`);
  return response.data;
};

export const getRent = async (bookId: string): Promise<rentHistory[]> => {
  const response = await api.get(`book/${bookId}/rent`);
  return response.data;
};

export const changeStatus = async (bookId: string, bookStatus?: bookStatus): Promise<bookStatus> => {
  const response = await api.patch(`book/${bookId}/status`, bookStatus);
  return response.data;
};
