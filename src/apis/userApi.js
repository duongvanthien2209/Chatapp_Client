import axiosClient from './apiClient';

class UserApi {
  constructor() {
    this.API_ENDPOINT = '/auth';
  }

  getToken(data) {
    return axiosClient.post(`${this.API_ENDPOINT}/login`, data);
  }

  checkToken(data) {
    return axiosClient.post(`${this.API_ENDPOINT}/check`, data);
  }

  register(data) {
    return axiosClient.post(`${this.API_ENDPOINT}/register`, data);
  }

  update(data, userId) {
    return axiosClient.post(`${this.API_ENDPOINT}/update/${userId}`, data);
  }
}

const userApi = new UserApi();
export default userApi;
