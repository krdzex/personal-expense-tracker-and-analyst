import React from 'react';
import { useSelector } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';
import auth from '../auth/authHelper';

const PrivateRoute = ({ component: Component, ...rest }) => {
    const isLoggedUser = useSelector(state => state.loggedReducer)
    return (
        <Route
            {...rest} render={(props) =>
                auth.isAuthentcated() || isLoggedUser ? (
                    <Component {...props} />
                ) : (
                    <Redirect to={{ pathname: "/registration", state: { from: props.location } }} />)
            }
        />)
};

export default PrivateRoute;