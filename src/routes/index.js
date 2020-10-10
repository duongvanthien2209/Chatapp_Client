import React from 'react';

import { BrowserRouter as Router, Route } from 'react-router-dom';

import { Main, Login, Register } from '../containers';
import { LoginProvider } from '../components/providers';
import PrivateRoute from './privateRoute';

const Routes = () => (
  <Router>
    <LoginProvider>
      <Route path="/" exact component={Login} />
      <Route path="/register" exact component={Register} />
      <PrivateRoute path="/main" component={Main} />
    </LoginProvider>
  </Router>
);

export default Routes;
