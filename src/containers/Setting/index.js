import React, { useContext, useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';

import {
  Container,
  Row,
  Col,
  Form,
  FormGroup,
  Input,
  Label,
  Button,
  FormText,
} from 'reactstrap';

import { LoginContext, WaitingContext, ToastContext } from '../../components/providers';

import handleToast from '../../helpers/handleToast';

import userApi from '../../apis/userApi';

import './setting.css';

const Setting = () => {
  const { user, setUser } = useContext(LoginContext);
  const { toast } = useContext(ToastContext);
  const { setIsWaiting } = useContext(WaitingContext);

  const [file, setFile] = useState(null);

  const updateShema = Yup.object().shape({
    name: Yup.string()
      .min(3, 'Tên phải nhiều hơn 3 ký tự')
      .max(30, 'Tên không được quá 30 ký tự')
      .required('Bạn phải nhập tên'),
    email: Yup.string()
      .email('Bạn nhập sai định dạng')
      .required('Bạn phải nhập email'),
    password: Yup.string()
      .min(3, 'Mật khẩu phải nhiều hơn 3 ký tự')
      .max(10, 'Mật khẩu không quá 10 ký tự'),
  });

  const fetchData = async (formData, userId) => {
    // debugger;
    try {
      const res = await userApi.update(formData, userId);

      if (res.status === 'success') {
        const { data: { user: currentUser, message } } = res;

        if (!currentUser || !message) {
          throw new Error('Có lỗi xảy ra');
        }

        setIsWaiting(() => false);
        handleToast(toast, message);
        setUser(() => currentUser);
      } else if (res.status === 'failed') {
        const { error: { message } } = res;
        throw new Error(message);
      }
    } catch (error) {
      // debugger;
      setIsWaiting(() => false);
      handleToast(toast, error.message, false);
    }
  };

  const formik = useFormik({
    initialValues: {
      name: user.name,
      email: user.email,
      password: '',
    },
    validationSchema: updateShema,
    onSubmit: () => {
      // debugger;
      const formData = new FormData();
      formData.append('name', formik.values.name);
      formData.append('email', formik.values.email);
      formData.append('password', formik.values.password);
      formData.append('avatar', file);

      setIsWaiting(() => true);
      // eslint-disable-next-line no-underscore-dangle
      fetchData(formData, user._id);
    },
  });

  return (
    <div className="setting-wrapper h-100">
      <Container className="h-100 d-flex flex-column">
        <h4 className="mb-3">Cài đặt</h4>
        <Row className="flex-grow-1">
          <Col sm="12">
            <div className="setting-personInformation border">
              <h4 className="border-bottom bg-light">Thông tin cá nhân</h4>
              <Form className="p-5 flex-grow-1" onSubmit={formik.handleSubmit}>
                <FormGroup className="row mb-3">
                  <Label for="name" className="col-sm-2 col-form-label">
                    Tên
                  </Label>
                  <div className="col-sm-10">
                    <Input
                      type="text"
                      id="name"
                      name="name"
                      value={formik.values.name}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                    />
                    <FormText color="danger">
                      {formik.touched.name && formik.errors.name}
                    </FormText>
                  </div>
                </FormGroup>
                <FormGroup className="row mb-3">
                  <Label for="email" className="col-sm-2 col-form-label">
                    Email
                  </Label>
                  <div className="col-sm-10">
                    <Input
                      type="text"
                      id="email"
                      name="email"
                      value={formik.values.email}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                    />
                    <FormText color="danger">
                      {formik.touched.email && formik.errors.email}
                    </FormText>
                  </div>
                </FormGroup>
                <FormGroup className="row mb-3">
                  <Label for="password" className="col-sm-2 col-form-label">
                    Mật khẩu mới
                  </Label>
                  <div className="col-sm-10">
                    <Input
                      type="password"
                      id="password"
                      name="password"
                      value={formik.values.password}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                    />
                    <FormText color="danger">
                      {formik.touched.password && formik.errors.password}
                    </FormText>
                  </div>
                </FormGroup>
                <FormGroup className="row mb-3">
                  <p className="col-sm-2 col-form-label">Ảnh đại diện</p>
                  <div className="col-sm-10">
                    <Label for="avatar" className="avatar__label">
                      Chọn file
                    </Label>
                    <Input
                      type="file"
                      id="avatar"
                      name="avatar"
                      onChange={(evt) => setFile(evt.target.files[0])}
                      hidden
                    />
                    <span className="ml-2">
                      {file ? file.name : 'Bạn chưa chọn ảnh'}
                    </span>
                  </div>
                </FormGroup>
                <FormGroup className="row">
                  <div className="col-sm-10 offset-sm-2">
                    <Button className="mr-2" type="reset" color="danger">
                      Hủy
                    </Button>
                    <Button type="submit" color="primary">
                      Cập nhật
                    </Button>
                  </div>
                </FormGroup>
              </Form>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Setting;
