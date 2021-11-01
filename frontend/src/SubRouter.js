import React, { Component } from 'react';
import { Switch } from 'react-router';
import BlockedRoute from './auth/BlockedRoute';
import PrivateRoute from './auth/PrivateRoute';
import Main from './Components/Main';
import Registration from './Components/Registration/Registration';

class SubRouter extends Component {
    render() {
        return (
                <Switch>   
                    <BlockedRoute exact path="/registration" component={Registration} />
                    <PrivateRoute component={Main} />
                </Switch>
        );
    }
};

export default SubRouter;