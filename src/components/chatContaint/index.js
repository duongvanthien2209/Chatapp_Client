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
    let { user } = useContext(LoginContext);
    let [rooms, setRooms] = useState([]);
    let [searchRooms, setSearchRooms] = useState([]);
    let [search, setSearch] = useState('');

    useEffect(() => {
        roomApi.getRooms(user._id).then(res => {
            // debugger;
            let { status, data: { rooms } } = res;

            if (status !== 'success' || !rooms) {
                throw new Error('Có lỗi xảy ra');
                return;
            }

            setRooms(currentRooms => rooms);
        }).catch(err => console.log(err));
    }, []);

    const onSearch = (evt, value) => {
        // Khi nhấn Enter -> Lấy danh sách các phòng có tên thõa mản
        if ((evt.which == 13 || evt.keyCode == 13) && value) {
            roomApi.getRoomsByName(value).then(res => {
                // debugger;
                let { status, data: { rooms } } = res;

                if (status !== 'success' || !rooms) {
                    throw new Error('Có lỗi xảy ra');
                    return;
                }

                setSearchRooms(currentRooms => rooms);
                setSearch('');
            }).catch(err => console.log(err));
        }
    }

    return (
        <div className="chat-containt h-100">
            <ChatContaintHeader setRooms={setRooms} user={user} />
            <ChatContaintInput onSearch={onSearch} search={search} setSearch={setSearch} />
            <Button className={classNames({ 'd-none': !searchRooms.length })} outline color="danger" onClick={ () => setSearchRooms([]) }>Reset</Button>
            <ScrollToBottom className="rooms-scroll">
                <ChatContaintRooms rooms={searchRooms.length !== 0 ? searchRooms : rooms}>
                    {
                        item => (<li className="room">
                            <Link to={`/main/chat/messages?roomId=${item._id}&roomName=${item.name}`}>{item.name}</Link>
                        </li>)
                    }
                </ChatContaintRooms>
            </ScrollToBottom>
        </div>
    );
}

export default ChatContaint;