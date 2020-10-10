import React from 'react';
import { Input } from 'reactstrap';
import PropTypes from 'prop-types';

// Font Awesome
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';

const ChatContaintInput = ({ onSearch, search, setSearch }) => (
  <div className="chat-containt__input-group my-3">
    <FontAwesomeIcon icon={faSearch} />
    <Input
      type="text"
      name="search"
      placeholder="Tìm kiếm"
      value={search}
      onChange={(evt) => setSearch(evt.target.value)}
      onKeyPress={(evt) => onSearch(evt, search)}
    />
  </div>
);

ChatContaintInput.propTypes = {
  onSearch: PropTypes.func.isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  search: PropTypes.object.isRequired,
  setSearch: PropTypes.func.isRequired,
};

export default ChatContaintInput;
