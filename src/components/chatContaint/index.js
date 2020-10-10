import React, { useState, useEffect, useContext } from 'react';
import ScrollToBottom from 'react-scroll-to-bottom';
import { Link } from 'react-router-dom';
import { Button } from 'reactstrap';
import classNames from 'classnames';

// Contexts
import { LoginContext } from '../providers';

// Apis
import { roomApi } from '../../api';

import ChatContaintHeader from './chatContaintHeader';
import ChatContaintInput from './chatContaintInput';
import ChatContaintRooms from './chatContainrRooms';

const ChatContaint = () => {
  const { user } = useContext(LoginContext);
  const [rooms, setRooms] = useState([]);
  const [searchRooms, setSearchRooms] = useState([]);
  const [search, setSearch] = useState('');

  useEffect(() => {
    roomApi
      .getRooms(user.id)
      .then((res) => {
        // debugger;
        const {
          status,
          data: { currentRooms },
        } = res;

        if (status !== 'success' || !currentRooms) {
          throw new Error('Có lỗi xảy ra');
        }

        setRooms(() => currentRooms);
      })
      // eslint-disable-next-line no-console
      .catch((err) => console.log(err));
  }, []);

  const onSearch = (evt, value) => {
    // Khi nhấn Enter -> Lấy danh sách các phòng có tên thõa mản
    if ((evt.which === 13 || evt.keyCode === 13) && value) {
      roomApi
        .getRoomsByName(value)
        .then((res) => {
          // debugger;
          const {
            status,
            data: { currentrRooms },
          } = res;

          if (status !== 'success' || !currentrRooms) {
            throw new Error('Có lỗi xảy ra');
          }

          setSearchRooms(() => currentrRooms);
          setSearch('');
        })
        // eslint-disable-next-line no-console
        .catch((err) => console.log(err));
    }
  };

  return (
    <div className="chat-containt h-100">
      <ChatContaintHeader setRooms={setRooms} user={user} />
      <ChatContaintInput
        onSearch={onSearch}
        search={search}
        setSearch={setSearch}
      />
      <Button
        className={classNames({ 'd-none': !searchRooms.length })}
        outline
        color="danger"
        onClick={() => setSearchRooms([])}
      >
        Reset
      </Button>
      <ScrollToBottom className="rooms-scroll">
        <ChatContaintRooms
          rooms={searchRooms.length !== 0 ? searchRooms : rooms}
        >
          {(item) => (
            <li className="room">
              <Link
                to={`/main/chat/messages?roomId=${item.id}&roomName=${item.name}`}
              >
                {item.name}
              </Link>
            </li>
          )}
        </ChatContaintRooms>
      </ScrollToBottom>
    </div>
  );
};

export default ChatContaint;
