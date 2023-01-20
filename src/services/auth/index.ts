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
