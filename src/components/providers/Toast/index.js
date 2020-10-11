import React from 'react';
import PropTypes from 'prop-types';

// Toast
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const ToastContext = React.createContext();

const ToastProvider = ({ children }) => (
  <ToastContext.Provider value={{ toast }}>
    {children}
    <ToastContainer
      position="top-right"
      autoClose={5000}
      hideProgressBar={false}
      newestOnTop={false}
      closeOnClick
      rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover
    />
  </ToastContext.Provider>
);

ToastProvider.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  children: PropTypes.array.isRequired,
};

export default ToastProvider;
