import React, { useState, useEffect, useContext } from 'react';
import queryString from 'query-string';
import io from 'socket.io-client';
import ScrollToBottom from 'react-scroll-to-bottom';
import moment from 'moment';
import PropTypes from 'prop-types';

// Font Awesome
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck } from '@fortawesome/free-solid-svg-icons';

import ChatMessagesHeader from './chatMessagesHeader';
import ChatMessagesList from './chatMessagesList';
import ChatMessagesInput from './chatMessagesInput';

// Contexts
import { LoginContext } from '../providers';

// Apis
import messageApi from '../../api/messageApi';

let socket;

const ChatMessages = ({ location }) => {
  const { roomId, roomName } = queryString.parse(location.search);

  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState('');

  const { user } = useContext(LoginContext);

  const ENDPOINT = 'https://chap-app-server.herokuapp.com/';

  // ComponentDidMount => tải messages
  useEffect(() => {
    socket = io(ENDPOINT);

    socket.on('event', (text) => {
      // eslint-disable-next-line no-console
      console.log(text);
    });

    socket.on('message', (currentMessage) => {
      // debugger;
      setMessages((currentMessages) => [...currentMessages, currentMessage]);
    });
    // debugger;
    messageApi
      .getMessagesByRoomId(roomId)
      .then((res) => {
        // debugger;
        const {
          status,
          data: { messages: newMessages },
        } = res;

        if (status !== 'success' || !newMessages) {
          throw new Error('Có lỗi xảy ra');
        }

        setMessages(() => newMessages);

        socket.emit('join', { roomId, userId: user.id }, (err) => {
          if (err) {
            // eslint-disable-next-line no-console
            console.log('Có lỗi xảy ra');
            return;
          }

          // eslint-disable-next-line no-console
          console.log('Done');
        });
      })
      // eslint-disable-next-line no-console
      .catch((err) => console.log(err));

    return () => {
      socket.emit('disconnect', { roomId, userName: user.name });

      socket.off();
    };
  }, [ENDPOINT, location.search]);

  const sendMessage = (evt) => {
    evt.preventDefault();

    socket.emit(
      'sendMessage',
      { userId: user.id, roomId, text: message },
      (err) => {
        if (err) {
          // eslint-disable-next-line no-console
          console.log('Có lỗi xảy ra');
          return;
        }

        setMessage('');
      },
    );
  };

  return (
    <div className="chat-messages h-100">
      <ChatMessagesHeader roomName={roomName} />
      <ScrollToBottom className="messages-scroll">
        <ChatMessagesList messages={messages}>
          {(item) => (item.userId === user.id ? (
            <li className="chat-message-me">
              <div className="chat-message-me__text">
                <p>{item.text}</p>
                <span>{moment(item.dateCreate).fromNow()}</span>
              </div>
              <FontAwesomeIcon icon={faCheck} className="fa-sm" />
            </li>
          ) : (
            <li className="chat-message-friend">
              <div className="chat-message-friend__infor">
                <img
                  className="rounded-circle"
                  src={
                    item.user.name === 'admin'
                      ? 'https://picsum.photos/200'
                      : item.user.avatar
                  }
                  alt="Person"
                />
                <small className="text-muted">{item.user.name}</small>
              </div>
              <div className="chat-message-friend__text">
                <p>{item.text}</p>
                <span>{moment(item.dateCreate).fromNow()}</span>
              </div>
            </li>
          ))}
        </ChatMessagesList>
      </ScrollToBottom>
      <ChatMessagesInput
        sendMessage={sendMessage}
        message={message}
        setMessage={setMessage}
      />
    </div>
  );
};

ChatMessages.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  location: PropTypes.object.isRequired,
};

export default ChatMessages;
