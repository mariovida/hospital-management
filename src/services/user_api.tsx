import { Users, UserCredentials } from '@src/types/users';
import { fetchWithToken } from '@src/utils/fetchWithToken';

export const api = {
  getUsers: async (): Promise<Users[]> => {
    return fetchWithToken('http://localhost:3000/users');
  },
  register: async (userData: UserCredentials): Promise<any> => {
    return fetchWithToken('http://localhost:3000/auth/registerUser', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userData),
    });
  },
  loginUser: async (userData: UserCredentials): Promise<any> => {
    return fetchWithToken('http://localhost:3000/auth/loginUser', {
      method: 'POST',
      body: JSON.stringify(userData),
    });
  },
};
