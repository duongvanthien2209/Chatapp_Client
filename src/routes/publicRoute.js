import React from 'react';
import { Route, Redirect } from 'react-router-dom';

const PublicRoute = ({ path, component: Component }) => {
    return (
        <Route path={path} component={ Component } />
    );
};

export default PublicRoute;