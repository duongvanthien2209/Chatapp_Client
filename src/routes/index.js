import React from 'react';

import { BrowserRouter as Router, Route } from 'react-router-dom';

import { Main, Login, Register } from '../containers';
import {
  LoginProvider,
  ToastProvider,
  WaitingProvider,
} from '../components/providers';
import PrivateRoute from './privateRoute';

const Routes = () => (
  <Router>
    <LoginProvider>
      <WaitingProvider>
        <ToastProvider>
          <Route path="/" exact component={Login} />
          <Route path="/register" exact component={Register} />
          <PrivateRoute path="/main" component={Main} />
        </ToastProvider>
      </WaitingProvider>
    </LoginProvider>
  </Router>
);

export default Routes;
