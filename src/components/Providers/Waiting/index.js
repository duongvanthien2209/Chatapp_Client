import React, { useState } from 'react';
import PropTypes from 'prop-types';
// Font Awesome
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSync } from '@fortawesome/free-solid-svg-icons';

import cls from './style.module.scss';

export const WaitingContext = React.createContext();

const WaitingProvider = ({ children }) => {
  const [isWaiting, setIsWaiting] = useState(false);

  return (
    <WaitingContext.Provider value={{ isWaiting, setIsWaiting }}>
      {children}
      {isWaiting && (
        <div className={cls.waiting__wrapper}>
          <div className="waiting">
            <FontAwesomeIcon className="fa-spin fa-5x" icon={faSync} />
          </div>
        </div>
      )}
    </WaitingContext.Provider>
  );
};

WaitingProvider.propTypes = {
  children: PropTypes.element.isRequired,
};

export default WaitingProvider;
