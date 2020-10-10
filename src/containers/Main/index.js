import React from 'react';
import { Switch, Route } from 'react-router-dom';

import './main.css';

// Components
import { Sidebar } from '../../components';
import { Chat, Setting } from '../index';

const Main = () => (
  <div className="page-wrapper">
    <div className="page-inner">
      <Sidebar />

      <div className="main-wrapper">
        <Switch>
          <Route path="/main/chat">
            <Chat />
          </Route>
          <Route path="/main/setting" component={Setting} />
        </Switch>
      </div>
    </div>
  </div>
);

export default Main;
