import apiClient from './apiClient';

import { baseUrl } from '../constants';

class MessageApi {
  // eslint-disable-next-line class-methods-use-this
  getMessagesByRoomId(roomId) {
    const url = `${baseUrl}/api/messages/${roomId}`;

    return apiClient.get(url);
  }
}

const messageApi = new MessageApi();
export default messageApi;
