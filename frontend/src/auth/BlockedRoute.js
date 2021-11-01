import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import auth from '../auth/authHelper';

const BlockedRoute = ({ component: Component, ...rest }) => (
    <Route
        {...rest} render={(props) =>
            !auth.isAuthentcated() ? (
                <Component {...props} />
            ) : (
                <Redirect to={{ pathname: "/", state: { from: props.location } }} />)
        }
    />
);

export default BlockedRoute;