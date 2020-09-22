import React, { useContext, useEffect } from 'react';
import { Route, Redirect } from 'react-router-dom';

import { LoginContext } from '../components/providers';

const PrivateRoute = ({ path, component: Component }) => {
    let { isLogin } = useContext(LoginContext); 

    return (
        <Route path={path} render={() => {
            return !isLogin ? <Redirect to={{
                pathname: '/'
            }} /> : (
                    <Component />
                )
        }} />
    );
};

export default PrivateRoute;