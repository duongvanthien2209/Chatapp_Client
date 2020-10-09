import apiClient from './apiClient';
import { base_url } from '../constants';

class RoomApi {
    createRoom(_userId, data) {
        let url = `${base_url}/api/rooms/${_userId}`;
        return apiClient.post(url, data);
    }

    getRooms(_userId) {
        let url = `${base_url}/api/rooms/${_userId}`;

        return apiClient.get(url);
    }

    getRoomsByName(value) {
        let url = `${base_url}/api/rooms/search?q=${value}`;

        return apiClient.get(url);
    }
}

const roomApi = new RoomApi();
export default roomApi;