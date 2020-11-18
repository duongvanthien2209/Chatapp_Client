import React from 'react';
import PropTypes from 'prop-types';

// Font Awesome
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPaperPlane } from '@fortawesome/free-solid-svg-icons';

import { Form, Input, Button } from 'reactstrap';

const ChatMessagesInput = ({ sendMessage, message, setMessage }) => {
  const onKeyPress = (evt) => {
    if ((evt.which === 13 || evt.keyCode === 13) && message) {
      sendMessage(evt);
    }
  };

  return (
    <Form className="chat-messages__input">
      <Input
        type="textarea"
        name="message"
        placeholder="Gởi tin nhắn..."
        value={message}
        onChange={(evt) => setMessage(evt.target.value)}
        onKeyPress={onKeyPress}
      />
      <Button
        className="chat-messages__input__btn"
        type="button"
        onClick={(evt) => sendMessage(evt)}
      >
        <FontAwesomeIcon icon={faPaperPlane} className="fa-sm" />
      </Button>
    </Form>
  );
};

ChatMessagesInput.propTypes = {
  sendMessage: PropTypes.func.isRequired,
  message: PropTypes.string.isRequired,
  setMessage: PropTypes.func.isRequired,
};

export default ChatMessagesInput;
