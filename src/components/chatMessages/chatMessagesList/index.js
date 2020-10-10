import React from 'react';
import PropTypes from 'prop-types';

const ChatMessagesList = ({ messages, children }) => (
  <ul className="list-unstyled chat-messages-list">
    {messages.map((item) => children(item))}
  </ul>
);

ChatMessagesList.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  messages: PropTypes.array.isRequired,
  children: PropTypes.func.isRequired,
};

export default ChatMessagesList;
