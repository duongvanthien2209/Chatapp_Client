import apiClient from './apiClient';

import { base_url } from '../constants';

class MessageApi {
    getMessagesByRoomId(roomId) {
        let url = `${base_url}/api/messages/${roomId}`;

        return apiClient.get(url);
    }
}

const messageApi = new MessageApi();
export default messageApi;

