import React from 'react';
import { useSelector } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import MainRouter from '../MainRouter';
import Header from './Header';
import Menu from './Menu';

const Main = () => {

    const menuState = useSelector(state => state.menuReducer)

    return (
        <BrowserRouter>
            <Menu />
            <div className={menuState ? "mainWrapper hide" : "mainWrapper"}>
                <Header />
                <MainRouter />
            </div>
        </BrowserRouter>
    );
};

export default Main;