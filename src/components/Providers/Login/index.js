import React, { useState } from 'react';
import PropTypes from 'prop-types';

export const LoginContext = React.createContext();

const LoginProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLogin, setLogin] = useState(false);

  return (
    <LoginContext.Provider
      value={{
        user,
        setUser,
        isLogin,
        setLogin,
      }}
    >
      {children}
    </LoginContext.Provider>
  );
};

LoginProvider.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  children: PropTypes.object.isRequired,
};

export default LoginProvider;
