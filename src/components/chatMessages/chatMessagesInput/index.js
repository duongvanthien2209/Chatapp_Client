import React from 'react';

import { useFormik } from 'formik';
import * as Yup from 'yup';

// Font Awesome
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faPaperPlane, faSmile } from '@fortawesome/free-solid-svg-icons';

import { Form, Input, Button, InputGroup, FormGroup } from 'reactstrap';

const ChatMessagesInput = ({ sendMessage, message, setMessage }) => {
    return (
        <Form className="chat-messages__input">
            {/* <Button className="chat-messages__input__btn" type="button">
                <FontAwesomeIcon icon={faPlus} className="fa-sm" />
            </Button> */}
            <Input
                type="text"
                name="message"
                placeholder="Gởi tin nhắn..."
                value={message}
                onChange={evt => setMessage(evt.target.value)}
            />
            {/* <Button type="button">
                <FontAwesomeIcon icon={faSmile} className="fa-lg" />
            </Button> */}
            <Button className="chat-messages__input__btn" type="button" onClick={evt => sendMessage(evt)}>
                <FontAwesomeIcon icon={faPaperPlane} className="fa-sm" />
            </Button>
        </Form>
    );
};

export default ChatMessagesInput;