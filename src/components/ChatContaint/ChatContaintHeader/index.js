import React, { useState, useContext } from 'react';
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Form,
  FormGroup,
  Label,
  Input,
} from 'reactstrap';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import PropTypes from 'prop-types';

// Font Awesome
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';

// Contexts
import { ToastContext, WaitingContext } from '../../Providers';

import handleToast from '../../../helpers/handleToast';

import { roomApi } from '../../../apis';

const ChatContaintHeader = ({ setRooms, user }) => {
  const [modal, setModal] = useState(false);
  const toggle = () => setModal(!modal);
  const { toast } = useContext(ToastContext);
  const { setIsWaiting } = useContext(WaitingContext);

  const RoomSchema = Yup.object().shape({
    name: Yup.string()
      .min(3, 'Tên phòng phải nhiều hơn 3 ký tự')
      .max(30, 'Tên phòng không quá 30 ký tự')
      .required('Bạn phải nhập tên phòng'),
  });

  const fetchData = async (userId, values) => {
    setIsWaiting(() => true);
    try {
      const res = await roomApi.createRoom(userId, values);

      if (res.status === 'success') {
        const { data: { room, message } } = res;

        if (!room || !message) {
          throw new Error('Có lỗi xảy ra');
        }

        setIsWaiting(() => false);
        toggle();
        setRooms((currentRooms) => [...currentRooms, room]);
        handleToast(toast, message);
      } else if (res.status === 'failed') {
        const { error: { message } } = res;
        throw new Error(message);
      }
    } catch (error) {
      setIsWaiting(() => false);
      toggle();
      handleToast(toast, error.message, false);
    }
  };

  const formik = useFormik({
    initialValues: {
      name: '',
    },
    validationSchema: RoomSchema,
    onSubmit: (values) => {
      // eslint-disable-next-line no-underscore-dangle
      fetchData(user._id, values);
    },
  });

  return (
    <div className="chat-containt__header">
      <h4>Chats</h4>

      <Button onClick={toggle}>
        <span className="mr-2">
          <FontAwesomeIcon icon={faPlus} />
        </span>
        Create New Room
      </Button>

      <Modal isOpen={modal} toggle={toggle}>
        <ModalHeader toggle={toggle}>Tạo phòng</ModalHeader>
        <ModalBody>
          <Form onSubmit={formik.handleSubmit}>
            <FormGroup>
              <Label for="name">Tên phòng</Label>
              <Input
                type="text"
                name="name"
                id="name"
                placeholder="Nhập tên phòng"
                onChange={formik.handleChange}
                value={formik.values.name}
                onBlur={formik.handleBlur}
              />
              <p className="text-danger">
                {formik.touched.name && formik.errors.name}
              </p>
            </FormGroup>
          </Form>
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={formik.handleSubmit}>
            Tạo
          </Button>
          <Button color="danger" onClick={toggle}>
            Hủy
          </Button>
        </ModalFooter>
      </Modal>
    </div>
  );
};

ChatContaintHeader.propTypes = {
  setRooms: PropTypes.func.isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  user: PropTypes.object.isRequired,
};

export default ChatContaintHeader;
