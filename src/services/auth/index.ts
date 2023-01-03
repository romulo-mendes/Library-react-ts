import { api } from '../api'

export const getUser = async (email: string, password: string) => {
    try {
        const response = await api.get(
            `login?email=${email}&password=${password}`
        )
        return Promise.resolve(response.data)
    } catch (error) {
        return Promise.reject(error)
    }
}
