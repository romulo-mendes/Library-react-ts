import { UserType } from '../../models/book';
import { api } from '../api';

export const userLogin = async (user: UserType) => {
  try {
    const response = await api.post(`user`, user);
    return response;
  } catch (error) {
    if (error.response.status === 401) {
      return error.response.status;
    } else {
      return error.response.status;
    }
  }
};

export const validateToken = async () => {
  try {
    const token = localStorage.getItem('token');
    const response = await api.post('validate-token', { token });
    if (response.status === 200) return true;
  } catch (error) {
    console.log(error);
    return false;
  }
};
