import React from 'react';
import PropTypes from 'prop-types';

const ChatContaintRooms = ({ rooms, children }) => (
  <ul className="list-unstyled rooms">{rooms.map(children)}</ul>
);

ChatContaintRooms.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  rooms: PropTypes.array.isRequired,
  children: PropTypes.func.isRequired,
};

export default ChatContaintRooms;
