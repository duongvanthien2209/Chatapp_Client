import React from 'react';
import PropTypes from 'prop-types';

const ChatMessagesList = ({ messages, children }) => (
  <ul className="list-unstyled chat-messages-list">{messages.map(children)}</ul>
);

ChatMessagesList.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  messages: PropTypes.array,
  children: PropTypes.func,
};

ChatMessagesList.defaultProps = {
  messages: [],
  children: null,
};

export default ChatMessagesList;
