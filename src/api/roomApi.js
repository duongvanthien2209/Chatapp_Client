import apiClient from './apiClient';

class RoomApi {
    createRoom(_userId, data) {
        let url = `/api/rooms/${_userId}`;
        return apiClient.post(url, data);
    }

    getRooms(_userId) {
        let url = `/api/rooms/${_userId}`;

        return apiClient.get(url);
    }

    getRoomsByName(value) {
        let url = `/api/rooms/search?q=${value}`;

        return apiClient.get(url);
    }
}

const roomApi = new RoomApi();
export default roomApi;