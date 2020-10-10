import React, { useContext } from 'react';
import { Route, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';

import { LoginContext } from '../components/providers';

const PrivateRoute = ({ path, component: Component }) => {
  const { isLogin } = useContext(LoginContext);

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
  // eslint-disable-next-line react/forbid-prop-types
  path: PropTypes.object.isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  component: PropTypes.object.isRequired,
};

export default PrivateRoute;
