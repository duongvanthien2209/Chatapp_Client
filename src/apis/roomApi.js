import apiClient from './apiClient';

class RoomApi {
  constructor() {
    this.API_ENDPOINT = '/rooms';
  }

  createRoom(_userId, data) {
    return apiClient.post(`${this.API_ENDPOINT}/${_userId}`, data);
  }

  getRooms(_userId) {
    return apiClient.get(`${this.API_ENDPOINT}/${_userId}`);
  }

  getRoomsByName(value) {
    return apiClient.get(`${this.API_ENDPOINT}/search?q=${value}`);
  }
}

const roomApi = new RoomApi();
export default roomApi;
