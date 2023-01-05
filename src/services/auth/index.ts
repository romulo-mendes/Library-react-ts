import { api } from '../api';

export const getUser = async (email: string, password: string) => {
  const response = await api.get(`login?email=${email}&password=${password}`);
  return response.data;
};
