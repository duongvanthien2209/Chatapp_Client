import axiosClient from './apiClient';
import { baseUrl } from '../constants';

class UserApi {
  // eslint-disable-next-line class-methods-use-this
  getToken(data) {
    const url = `${baseUrl}/api/auth/login`;

    return axiosClient.post(url, data);
  }

  // eslint-disable-next-line class-methods-use-this
  register(data) {
    const url = `${baseUrl}/api/auth/register`;

    return axiosClient.post(url, data);
  }

  // eslint-disable-next-line class-methods-use-this
  update(data, userId) {
    const url = `${baseUrl}/api/auth/update/${userId}`;

    return axiosClient.post(url, data);
  }
}

const userApi = new UserApi();
export default userApi;
