import React, { useState, useEffect, useContext } from 'react';
import queryString from 'query-string';
import io from 'socket.io-client';
import ScrollToBottom from 'react-scroll-to-bottom';
import moment from 'moment';

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
    let { roomId, roomName } = queryString.parse(location.search);

    let [messages, setMessages] = useState([]);
    let [message, setMessage] = useState('');

    let { user } = useContext(LoginContext);

    const ENDPOINT = 'http://localhost:5000';

    // ComponentDidMount => tải messages
    useEffect(() => {
        console.log('Construtor');

        socket = io(ENDPOINT);

        socket.on('event', text => {
            console.log(text);
        });

        socket.on('message', currentMessage => {
            // debugger;
            setMessages(currentMessages => [...currentMessages, currentMessage]);
        });
        // debugger;
        messageApi.getMessagesByRoomId(roomId).then(res => {
            // debugger;
            let { status, data: { messages: newMessages } } = res;

            if (status !== 'success' || !newMessages) {
                throw new Error('Có lỗi xảy ra');
                return;
            }

            setMessages(currentMessages => newMessages);

            socket.emit('join', { roomId, userId: user._id }, err => {
                if (err) {
                    console.log('Có lỗi xảy ra');
                    return;
                }

                console.log('Done');
            });
        }).catch(err => console.log(err));

        return () => {
            console.log('DidMount')
            socket.emit('disconnect', { roomId, userName: user.name });

            socket.off();
        }
    }, [ENDPOINT, location.search]);

    const sendMessage = evt => {
        evt.preventDefault();

        socket.emit('sendMessage', { userId: user._id, roomId, text: message }, (err) => {
            if (err) {
                console.log('Có lỗi xảy ra');
                return;
            }

            setMessage('');
        });
    }

    return (
        <div className="chat-messages h-100">
            <ChatMessagesHeader roomName={roomName} />
            <ScrollToBottom className="messages-scroll">
                <ChatMessagesList messages={messages}>
                    {
                        item => {
                            return item.userId === user._id ? (
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
                                            <img className="rounded-circle" src={item.user.name === 'admin' ? 'https://picsum.photos/200' : item.user.avatar} alt="Person" />
                                            <small className="text-muted">{item.user.name}</small>
                                        </div>
                                        <div className="chat-message-friend__text">
                                            <p>{item.text}</p>
                                            <span>{moment(item.dateCreate).fromNow()}</span>
                                        </div>
                                    </li>
                                )
                        }
                    }
                </ChatMessagesList>
            </ScrollToBottom>
            <ChatMessagesInput sendMessage={sendMessage} message={message} setMessage={setMessage} />
        </div>
    );
};

export default ChatMessages;