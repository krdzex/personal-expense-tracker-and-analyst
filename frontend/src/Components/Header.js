import React, { useState } from 'react';
import { Icon } from '@iconify/react';
import { useSelector, useDispatch } from 'react-redux';
import { changeCurrency, closeMenu } from '../Actions';
import Moment from 'react-moment';
import auth from '../auth/authHelper';


const Header = () => {
    const dispatch = useDispatch();
    const menuState = useSelector(state => state.menuReducer)

    const onSignOut = () => {
        auth.signOut();
        window.location.reload();
    }

    const [active, setActive] = useState(false)
    const onCurrencyClick = (currency) => {
        dispatch(changeCurrency(currency))
        setActive(false)
    }
    const currency = useSelector(state => state.currencyReducer)
    return (
        <div className="headerWrapper">
            <div className="headerLeftSide" onClick={() => dispatch(closeMenu())}>
                {menuState ? <Icon icon="ant-design:menu-unfold-outlined" /> : <Icon icon="ant-design:menu-fold-outlined" />}
            </div>
            <div className="midSection">
                <Moment interval={1000} format="YYYY/MM/DD - hh:mm:ss">
                </Moment>
            </div>
            <div className="headerRightSide">
                <div className={active ? "currencyChoose active" : "currencyChoose"}>
                    Currency:
                    <div className={active ? "dropList active" : "dropList"}>
                        <div style={currency === "dollar" ? { order: -1 } : {}} onClick={() => onCurrencyClick("dollar")}><Icon icon="bx:bx-dollar" className="iconCurrency"/></div>
                        <div style={currency === "euro" ? { order: -1 } : {}} onClick={() => onCurrencyClick("euro")}><Icon icon="ic:twotone-euro-symbol" className="iconCurrency"/></div>
                        <div style={currency === "bam" ? { order: -1 } : {}} onClick={() => onCurrencyClick("bam")}>BAM</div>
                    </div>
                    <div className="icon">
                        {!active ? <Icon icon="akar-icons:circle-chevron-down-fill" className="realIcon" onClick={() => setActive(!active)} /> : <Icon icon="akar-icons:circle-chevron-up-fill" className="realIcon" onClick={() => setActive(!active)} />}
                    </div>
                </div>


                <div className="signOut">
                    <div className="icon"><Icon icon="uil:signout" className="realIcon" /></div>
                    <div className="text" onClick={onSignOut}>Sign Out</div>
                </div>
            </div>
        </div>
    );
};

export default Header;