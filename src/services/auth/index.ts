import { UserType } from '../../models/book';
import { api } from '../api';

export const userLogin = async (user: UserType) => {
  try {
    const response = await api.post(`user`, user);
    return response;
  } catch (error: any) {
    if (error.response.status === 401) {
      return error.response.status;
    } else {
      return error.response.status;
    }
  }
};

export const validateToken = async () => {
  try {
    const response = await api.get('validate-token', {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    });
    if (response.status === 200) return true;
    else return false;
  } catch (error) {
    console.error(error);
    return false;
  }
};
