import apiClient from './apiClient';

class MessageApi {
  // eslint-disable-next-line class-methods-use-this
  getMessagesByRoomId(roomId) {
    const url = `/messages/${roomId}`;

    return apiClient.get(url);
  }
}

const messageApi = new MessageApi();
export default messageApi;
