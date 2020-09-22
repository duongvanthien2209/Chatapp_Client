import apiClient from './apiClient';

class MessageApi {
    getMessagesByRoomId(roomId) {
        let url = `/api/messages/${roomId}`;

        return apiClient.get(url);
    }
}

const messageApi = new MessageApi();
export default messageApi;

