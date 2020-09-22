import React, { useContext } from 'react';
import { Nav } from 'reactstrap';
import { Link } from 'react-router-dom';

// Font Awesome
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCommentDots, faCog, faSignOutAlt } from '@fortawesome/free-solid-svg-icons';

import { LoginContext } from '../providers';
import { url_image } from '../../constants';


const Sidebar = () => {
    let { user } = useContext(LoginContext);

    return user && (
        <Nav className="navbar-main">
            <div className="navbar-main__header">
                {
                    user.avatar === 'https://picsum.photos/200' ? <img className="rounded-circle" src={user.avatar} /> : <div className="rounded-circle navbar-main__header__avatar" style={{ backgroundImage: `url('${url_image + user.avatar}')` }}></div>
                }
                <p className="font-weight-bold mt-1">{user.name}</p>
            </div>
            <ul className="list-unstyled navbar-main__menu">
                <li><Link to="/main/chat"><span className="mr-2"><FontAwesomeIcon icon={faCommentDots} className="fa-lg" /></span>Home</Link></li>
                <li><Link to="/main/setting"><span className="mr-2"><FontAwesomeIcon icon={faCog} className="fa-lg" /></span>Setting</Link></li>
            </ul>
            <div className="navbar-main__footer">
                <a href="#"><span><FontAwesomeIcon icon={faSignOutAlt} className="fa-lg" /></span>Log out</a>
            </div>
        </Nav>
    );
}

export default Sidebar;