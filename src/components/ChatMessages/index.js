/* eslint-disable no-underscore-dangle */
import React, { useState, useEffect, useContext } from 'react';
import queryString from 'query-string';
import io from 'socket.io-client';
import ScrollToBottom from 'react-scroll-to-bottom';
import moment from 'moment';
import PropTypes from 'prop-types';

// Font Awesome
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck } from '@fortawesome/free-solid-svg-icons';

import ChatMessagesHeader from './ChatMessagesHeader';
import ChatMessagesList from './ChatMessagesList';
import ChatMessagesInput from './ChatMessagesInput';

// Constaints
import { ENDPOINT } from '../../constants/index';

// Contexts
import { LoginContext, WaitingContext, ToastContext } from '../Providers';

import handleToast from '../../helpers/handleToast';

// Apis
import messageApi from '../../apis/messageApi';

let socket;

const ChatMessages = ({ location }) => {
  const { roomId, roomName } = queryString.parse(location.search);

  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState('');

  const { user } = useContext(LoginContext);
  const { toast } = useContext(ToastContext);
  const { setIsWaiting } = useContext(WaitingContext);

  const fetchData = async () => {
    try {
      const {
        status,
        data: { messages: newMessages },
      } = await messageApi.getMessagesByRoomId(roomId);

      if (status !== 'success' || !newMessages) {
        throw new Error('Có lỗi xảy ra');
      }

      setIsWaiting(() => false);
      setMessages(() => newMessages);

      // eslint-disable-next-line no-underscore-dangle
      socket.emit('join', { roomId, userId: user._id }, (err) => {
        if (err) {
          return handleToast(toast, 'Có lỗi xảy ra!', false);
        }

        return true;
      });

      return true;
    } catch (error) {
      return handleToast(toast, 'Có lỗi xảy ra!', false);
    }
  };

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
    setIsWaiting(() => true);
    fetchData();

    return () => {
      socket.emit('disconnect', { roomId, userName: user.name });

      socket.off();
    };
  }, [ENDPOINT, location.search]);

  const sendMessage = (evt) => {
    evt.preventDefault();

    socket.emit(
      'sendMessage',
      // eslint-disable-next-line no-underscore-dangle
      { userId: user._id, roomId, text: message },
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
          {(item, key) => (item.userId === user._id ? (
            <li className="chat-message-me" key={key}>
              <div className="chat-message-me__text">
                <p>{item.text}</p>
                <span>{moment(item.dateCreate).fromNow()}</span>
              </div>
              <FontAwesomeIcon icon={faCheck} className="fa-sm" />
            </li>
          ) : (
            <li className="chat-message-friend" key={key}>
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
