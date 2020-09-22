import React from 'react';

const ChatContaintRooms = ({ rooms, children }) => {
    return (
        <ul className="list-unstyled rooms">
            {
                rooms.map(children)
            }
        </ul>
    );
};

export default ChatContaintRooms;