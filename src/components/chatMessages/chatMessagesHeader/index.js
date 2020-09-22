import React from 'react';
// Font Awesome
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEllipsisV } from '@fortawesome/free-solid-svg-icons';

import { Button } from 'reactstrap'; 

const ChatMessagesHeader = ({ roomName }) => {
    return (
        <div className="chat-messages__header">
            <div className="chat-messages__person">
                <h4>{roomName}</h4>
            </div>
            {/* <Button><FontAwesomeIcon icon={faEllipsisV} /></Button> */}
        </div>
    );
};

export default ChatMessagesHeader;