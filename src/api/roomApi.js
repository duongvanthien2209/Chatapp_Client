import apiClient from './apiClient';
import { baseUrl } from '../constants';

class RoomApi {
  // eslint-disable-next-line class-methods-use-this
  createRoom(_userId, data) {
    const url = `${baseUrl}/api/rooms/${_userId}`;
    return apiClient.post(url, data);
  }

  // eslint-disable-next-line class-methods-use-this
  getRooms(_userId) {
    const url = `${baseUrl}/api/rooms/${_userId}`;

    return apiClient.get(url);
  }

  // eslint-disable-next-line class-methods-use-this
  getRoomsByName(value) {
    const url = `${baseUrl}/api/rooms/search?q=${value}`;

    return apiClient.get(url);
  }
}

const roomApi = new RoomApi();
export default roomApi;
