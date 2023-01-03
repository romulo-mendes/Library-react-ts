import { Book } from './../../models/book'
import { api } from '../api'

export const postBook = async (book: Book) => {
    try {
        const response = await api.post(`books`, book)
        return response.data
    } catch (error) {
        console.error(error)
    }
}

export const getAllBooks = async (): Promise<Book[]> => {
    try {
        const response = await api.get(`books`)
        return response.data
    } catch (error) {
        return Promise.reject(error)
    }
}

export const getBook = async (bookId: string): Promise<Book> => {
    try {
        const response = await api.get(`books/${bookId}`)
        return response.data
    } catch (error) {
        return Promise.reject(error)
    }
}

export const editBook = async (bookId: string, book: Book) => {
    try {
        const response = await api.put(`books/${bookId}`, book)
        return response.data
    } catch (error) {
        return Promise.reject(error)
    }
}
