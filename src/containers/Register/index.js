import React, { useState, useContext } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
// Font Awesome
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLock, faAt, faUser } from '@fortawesome/free-solid-svg-icons';

import { Redirect } from 'react-router-dom';
import {
  Button,
  Form,
  FormGroup,
  Input,
  FormText,
  Container,
  InputGroup,
  InputGroupAddon,
  InputGroupText,
} from 'reactstrap';
import { userApi } from '../../api';
import { LoginContext } from '../../components/providers';

// CSS
import '../Login/login.css';

// Images
import person from '../../assets/images/person.svg';

const Register = () => {
  const [isCompleted, setCompleted] = useState(false);
  const { isLogin } = useContext(LoginContext);

  const LoginSchema = Yup.object().shape({
    email: Yup.string()
      .email('Email không hợp lệ')
      .required('Bắt buộc phải nhập email'),
    password: Yup.string()
      .min(6, 'Password phải có ít nhất 6 ký tự')
      .max(10, 'Bạn không được nhập quá 10 ký tự')
      .required('Bạn bắt buộc phải nhập mật khẩu'),
    name: Yup.string()
      .max(30, 'Bạn không được nhập dài quá 30 ký tự')
      .required('Bạn bắt buộc phải nhập tên'),
  });

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
      name: '',
    },
    validationSchema: LoginSchema,
    onSubmit: (values) => {
      // Values = { email, password }
      userApi
        .register(values)
        .then((res) => {
          const {
            status,
            data: { message },
          } = res;

          if (status !== 'success') {
            throw new Error(message);
          }

          setCompleted(() => !isCompleted);
        })
        // eslint-disable-next-line no-console
        .catch((err) => console.log(err));
    },
  });

  return !isCompleted ? (
    !isLogin && (
      <Container className="p-0" fluid>
        <div className="form-wrapper">
          <Form className="login-form rounded" onSubmit={formik.handleSubmit}>
            <div className="login-image">
              <img className="rounded-circle" src={person} alt="person" />
            </div>
            <FormGroup className="my-3 w-100">
              <InputGroup>
                <InputGroupAddon addonType="prepend">
                  <InputGroupText>
                    <FontAwesomeIcon icon={faAt} className="fa-lg" />
                  </InputGroupText>
                </InputGroupAddon>
                <Input
                  type="text"
                  size="lg"
                  name="email"
                  placeholder="Nhập email của bạn"
                  onChange={formik.handleChange}
                  value={formik.values.email}
                  onBlur={formik.handleBlur}
                />
              </InputGroup>
              <FormText color="danger">
                {formik.touched.email && formik.errors.email}
              </FormText>
            </FormGroup>
            <FormGroup className="mb-3 w-100">
              <InputGroup>
                <InputGroupAddon addonType="prepend">
                  <InputGroupText>
                    <FontAwesomeIcon icon={faUser} className="fa-lg" />
                  </InputGroupText>
                </InputGroupAddon>
                <Input
                  type="text"
                  size="lg"
                  name="name"
                  placeholder="Nhập tên của bạn"
                  onChange={formik.handleChange}
                  value={formik.values.name}
                  onBlur={formik.handleBlur}
                />
              </InputGroup>
              <FormText color="danger">
                {formik.touched.name && formik.errors.name}
              </FormText>
            </FormGroup>
            <FormGroup className="w-100">
              <InputGroup>
                <InputGroupAddon addonType="prepend">
                  <InputGroupText>
                    <FontAwesomeIcon icon={faLock} className="fa-lg" />
                  </InputGroupText>
                </InputGroupAddon>
                <Input
                  type="password"
                  size="lg"
                  name="password"
                  placeholder="Nhập mật khẩu của bạn"
                  onChange={formik.handleChange}
                  values={formik.values.password}
                  onBlur={formik.handleBlur}
                />
              </InputGroup>
              <FormText color="danger">
                {formik.touched.password && formik.errors.password}
              </FormText>
            </FormGroup>
            <Button className="my-3" size="lg" outline color="primary">
              Đăng ký
            </Button>
          </Form>
        </div>
      </Container>
    )
  ) : (
    <Redirect
      to={{
        pathname: '/',
      }}
    />
  );
};

export default Register;
