import React, { useState } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Form, FormGroup, Label, Input } from 'reactstrap';
import { useFormik } from 'formik';
import * as Yup from 'yup';

// Font Awesome
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';

import { roomApi } from '../../../api';

const ChatContaintHeader = ({ setRooms, user }) => {
    const [modal, setModal] = useState(false);
    const toggle = () => setModal(!modal);

    const RoomSchema = Yup.object().shape({
        name: Yup.string()
                .min(3, 'Tên phòng phải nhiều hơn 3 ký tự')
                .max(30, 'Tên phòng không quá 30 ký tự')
                .required('Bạn phải nhập tên phòng')
    });

    const formik = useFormik({
        initialValues: {
            name: ''
        },
        validationSchema: RoomSchema,
        onSubmit: values => {
            roomApi.createRoom(user._id, { name: formik.values.name }).then(res => {
                // debugger;
                let { status, data: { room } } = res;

                if(status !== 'success' || !room) {
                    throw new Error('Có lỗi xảy ra');
                    return;
                }

                toggle();
                setRooms(currentRooms => [...currentRooms, room]);
            }).catch(err => console.log(err));
        },
    });

    return (
        <div className="chat-containt__header">
            <h4>Chats</h4>

            <Button onClick={toggle}><span className="mr-2"><FontAwesomeIcon icon={faPlus} /></span>Create New Room</Button>

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
                            <p className="text-danger">{formik.touched.name && formik.errors.name}</p>
                        </FormGroup>
                    </Form>
                </ModalBody>
                <ModalFooter>
                    <Button color="primary" onClick={formik.handleSubmit}>Tạo</Button>
                    <Button color="secondary" onClick={toggle}>Xóa</Button>
                </ModalFooter>
            </Modal>
        </div>
    );
}

export default ChatContaintHeader;