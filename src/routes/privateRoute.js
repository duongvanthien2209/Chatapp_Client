import React, { useContext } from 'react';
import { Route, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';

import { LoginContext, ToastContext } from '../components/providers';

import handleToast from '../helpers/handleToast';

// Apis
import { userApi } from '../apis';

const PrivateRoute = ({ path, component: Component }) => {
  const { isLogin, setLogin, setUser } = useContext(LoginContext);
  const { toast } = useContext(ToastContext);
  // const { setIsWaiting } = useContext(WaitingContext);

  const fetchData = async () => {
    const token = localStorage.getItem('token');

    if (token && !isLogin) {
      try {
        const {
          status,
          data: { user },
        } = await userApi.checkToken({ token });

        // debugger;
        if (status !== 'success' || !user) {
          throw new Error();
        }

        setLogin(() => true);
        setUser(() => user);
        // setIsWaiting(() => false);
      } catch (error) {
        // setIsWaiting(() => false);
        handleToast(toast, 'Có lỗi xảy ra!', false);
      }
    }
  };

  // setIsWaiting(() => true);
  fetchData();

  return (
    <Route
      path={path}
      render={() => (!isLogin ? (
        <Redirect
          to={{
            pathname: '/',
          }}
        />
      ) : (
        <Component />
      ))}
    />
  );
};

PrivateRoute.propTypes = {
  path: PropTypes.string.isRequired,
  component: PropTypes.elementType.isRequired,
};

export default PrivateRoute;
