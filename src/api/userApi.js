import axiosClient from './apiClient';

class UserApi {
    getToken(data) {
        let url = '/api/auth/login';

        return axiosClient.post(url, data);
    }

    register(data) {
        let url = '/api/auth/register';

        return axiosClient.post(url, data);
    }

    update(data, userId) {
        let url = `/api/auth/update/${userId}`;

        return axiosClient.post(url, data);
    }
}

const userApi = new UserApi();
export default userApi;