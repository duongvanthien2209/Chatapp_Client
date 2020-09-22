import React from 'react';

import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
} from "react-router-dom";

import { Main, Login, Register } from '../containers';
import { LoginProvider } from '../components/providers';
import PrivateRoute from './privateRoute'; 

const Routes = () => {
    return (
        <Router>
            <LoginProvider>
                <Route path="/" exact component={Login} />
                <Route path="/register" exact component={Register} />
                <PrivateRoute path="/main" component={Main} />
            </LoginProvider>
        </Router>
    );
};

export default Routes;