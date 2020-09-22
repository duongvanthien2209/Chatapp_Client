import React from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
} from "react-router-dom";

import './main.css';

// Components
import { Sidebar } from '../../components';
import { Chat } from '../index';

import { Setting } from '../index'; 

const Main = () => {
    return (
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
}

export default Main;