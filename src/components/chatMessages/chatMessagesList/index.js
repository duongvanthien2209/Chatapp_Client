import React from 'react';

const ChatMessagesList = ({ messages, children }) => {
    return (
        <ul className="list-unstyled chat-messages-list">
            {
                messages.map(item => children(item))
            }
        </ul>
    );
};

export default ChatMessagesList;

