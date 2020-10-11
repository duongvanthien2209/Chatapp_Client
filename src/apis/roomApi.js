import apiClient from './apiClient';
import { baseUrl } from '../constants';

const API_ENDPOINT = `${baseUrl}/api/rooms`;

class RoomApi {
  // eslint-disable-next-line class-methods-use-this
  createRoom(_userId, data) {
    return apiClient.post(`${API_ENDPOINT}/${_userId}`, data);
  }

  // eslint-disable-next-line class-methods-use-this
  getRooms(_userId) {
    return apiClient.get(`${API_ENDPOINT}/${_userId}`);
  }

  // eslint-disable-next-line class-methods-use-this
  getRoomsByName(value) {
    return apiClient.get(`${API_ENDPOINT}/search?q=${value}`);
  }
}

const roomApi = new RoomApi();
export default roomApi;
