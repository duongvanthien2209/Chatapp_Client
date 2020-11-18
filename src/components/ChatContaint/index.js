import React, { useState, useEffect, useContext } from 'react';
import ScrollToBottom from 'react-scroll-to-bottom';
import { Link } from 'react-router-dom';
import { Button } from 'reactstrap';
import classNames from 'classnames';

// Contexts
import { LoginContext, WaitingContext, ToastContext } from '../Providers';

import handleToast from '../../helpers/handleToast';
// Apis
import { roomApi } from '../../apis';

import ChatContaintHeader from './ChatContaintHeader';
import ChatContaintInput from './ChatContaintInput';
import ChatContaintRooms from './ChatContainrRooms';

const ChatContaint = () => {
  const { user } = useContext(LoginContext);
  const { toast } = useContext(ToastContext);
  const { setIsWaiting } = useContext(WaitingContext);

  const [rooms, setRooms] = useState([]);
  const [searchRooms, setSearchRooms] = useState([]);
  const [search, setSearch] = useState('');

  const fetchData = async (userId) => {
    try {
      const {
        status,
        data: { rooms: currentRooms },
      } = await roomApi.getRooms(userId);

      if (status !== 'success' || !currentRooms) {
        throw new Error('Có lỗi xảy ra');
      }

      setIsWaiting(() => false);
      setRooms(() => currentRooms);
    } catch (error) {
      setIsWaiting(() => false);
      handleToast(toast, 'Có lỗi xảy ra, xin vui lòng thử lại sau!', false);
    }
  };

  useEffect(() => {
    setIsWaiting(() => true);
    // eslint-disable-next-line no-underscore-dangle
    fetchData(user._id);
  }, []);

  const onSearch = async (evt, value) => {
    // Khi nhấn Enter -> Lấy danh sách các phòng có tên thõa mản
    if ((evt.which === 13 || evt.keyCode === 13) && value) {
      setIsWaiting(() => true);
      try {
        const {
          status,
          data: { rooms: currentrRooms },
        } = await roomApi.getRoomsByName(value);

        if (status !== 'success' || !currentrRooms) {
          throw new Error('Có lỗi xảy ra');
        }

        setIsWaiting(() => false);
        setSearchRooms(() => currentrRooms);
        setSearch('');
      } catch (error) {
        setIsWaiting(() => false);
        handleToast(toast, 'Có lỗi xảy ra, xin vui lòng thử lại sau!', false);
      }
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
          {(item, key) => (
            <li className="room" key={key}>
              <Link
                // eslint-disable-next-line no-underscore-dangle
                to={`/main/chat/messages?roomId=${item._id}&roomName=${item.name}`}
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
