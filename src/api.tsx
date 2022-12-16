import axios from "axios";

const api = axios.create({
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
