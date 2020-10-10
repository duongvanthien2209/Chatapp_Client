import React, { useContext, useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';

import {
  Container,
  Row,
  Col,
  Nav,
  NavItem,
  NavLink,
  Form,
  FormGroup,
  Input,
  Label,
  Button,
  FormText,
} from 'reactstrap';

import { LoginContext } from '../../components/providers/login';

import userApi from '../../api/userApi';

import './setting.css';

const Setting = () => {
  const { user, setUser } = useContext(LoginContext);
  const [file, setFile] = useState(null);

  const updateShema = Yup.object().shape({
    name: Yup.string()
      .min(3, 'Tên phải nhiều hơn 3 ký tự')
      .max(30, 'Tên không được quá 30 ký tự')
      .required('Bạn phải nhập tên'),
    email: Yup.string()
      .email('Bạn nhập sai định dạng')
      .required('Bạn phải nhập email'),
    password: Yup.string().required('Bạn phải nhập mật khẩu'),
  });

  const formik = useFormik({
    initialValues: {
      name: user.name,
      email: user.email,
      password: user.password,
    },
    validationSchema: updateShema,
    onSubmit: () => {
      const formData = new FormData();
      formData.append('name', formik.values.name);
      formData.append('email', formik.values.email);
      formData.append('password', formik.values.password);
      formData.append('avatar', file);

      // console.log(user);
      userApi
        .update(formData, user.id)
        .then((res) => {
          // debugger;
          const {
            status,
            data: { currentUser },
          } = res;

          if (status !== 'success' || !currentUser) {
            throw new Error('Có lỗi xảy ra');
          }

          setUser(() => currentUser);
        })
        // eslint-disable-next-line no-console
        .catch((err) => console.log(err));
    },
  });

  return (
    <div className="setting-wrapper h-100">
      <Container className="h-100 d-flex flex-column">
        <h4 className="mb-3">Cài đặt</h4>
        <Row className="flex-grow-1">
          <Col md="4" className="d-none d-md-block">
            <Nav vertical className="h-100 border setting-navbar">
              <NavItem>
                <NavLink className="border-bottom" href="#">
                  Cập nhật thông tin
                </NavLink>
              </NavItem>
            </Nav>
          </Col>
          <Col sm="12" md="8">
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
                    Mật khẩu
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
                  <Label for="avatar" className="col-sm-2 col-form-label">
                    Ảnh đại diện
                  </Label>
                  <div className="col-sm-10">
                    <Input
                      type="file"
                      id="avatar"
                      name="avatar"
                      onChange={(evt) => setFile(evt.target.files[0])}
                    />
                  </div>
                </FormGroup>
                <FormGroup className="row">
                  <div className="col-sm-10 offset-sm-2">
                    <Button className="mr-2" type="reset" color="danger">
                      Reset
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
