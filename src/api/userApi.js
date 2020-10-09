import axiosClient from './apiClient';
import { base_url } from '../constants';

class UserApi {
    getToken(data) {
        let url = `${base_url}/api/auth/login`;

        return axiosClient.post(url, data);
    }

    register(data) {
        let url = `${base_url}/api/auth/register`;

        return axiosClient.post(url, data);
    }

    update(data, userId) {
        let url = `${base_url}/api/auth/update/${userId}`;

        return axiosClient.post(url, data);
    }
}

const userApi = new UserApi();
export default userApi;