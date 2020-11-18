import React from 'react';
import PropTypes from 'prop-types';

const ChatMessagesHeader = ({ roomName }) => (
  <div className="chat-messages__header">
    <div className="chat-messages__person">
      <h4>{roomName}</h4>
    </div>
  </div>
);

ChatMessagesHeader.propTypes = {
  roomName: PropTypes.string.isRequired,
};

export default ChatMessagesHeader;
