import React, { useState } from 'react';
import { Icon } from '@iconify/react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { openPopUp } from '../Actions';

const Menu = () => {
    const dispatch = useDispatch()
    const [name, setName] = useState("dashBoard");
    const [transaction, setTransaction] = useState(false);
    const [statistic, setStatistic] = useState(false)
    const [profile, setProfile] = useState(false)
    const onLiClick = (name) => {
        setName(name)
        setStatistic(false)
        setTransaction(false)
        setProfile(false)
    }

    const menuState = useSelector(state => state.menuReducer)

    const openTransitionsNav = (e) => {
        e.preventDefault()
        setTransaction(!transaction)
        setStatistic(false)
        setProfile(false)
    }
    const openStatisticNav = (e) => {
        e.preventDefault()
        setStatistic(!statistic)
        setTransaction(false)
        setProfile(false)
    }
    const openProfileNav = (e) => {
        e.preventDefault()
        setProfile(!profile)
        setTransaction(false)
        setStatistic(false)
    }
    return (
        <div className={menuState ? "navigation hide" : "navigation"}>
            <ul>
                <li >
                    <a href="/#">
                        <span className="icon"><Icon icon="emojione:money-bag" className="realIcon" /></span>
                        <span className="title">PETA project</span>
                    </a>
                </li>

                <li className={name === "dashBoard" ? "dashBoard active" : "dashBoard"} onClick={() => onLiClick("dashBoard")}>
                    <Link to="/dashboard" >
                        <span className="icon"><Icon icon="mdi:tablet-dashboard" className="realIcon" /></span>
                        <span className="title">Dashboard</span>
                    </Link>
                </li>
                <li className={transaction ? "transactionWrapper showNav" : "transactionWrapper"}>
                    <a href="/#" onClick={openTransitionsNav}>
                        <span className="icon"><Icon icon="uil:transaction" className="realIcon" /></span>
                        <span className="title">Transactions</span>
                    </a>
                    <div className="subNav">
                        <Link to="/transactions/dialy" id="active">
                            <span className="icon"><Icon icon="fa-solid:calendar-day" className="realIcon" /></span>
                            <span className="title">Dialy transactions</span>
                        </Link>
                        <Link to="/transactions/weekly">
                            <span className="icon"><Icon icon="bi:calendar2-week-fill" className="realIcon" /></span>
                            <span className="title">Weekly transactions</span>

                        </Link>
                        <Link to="/transactions/monthly">
                            <span className="icon"><Icon icon="iwwa:month" className="realIcon" /></span>
                            <span className="title">Monthly transactions</span>

                        </Link>
                        <Link to="/transactions/yearly">
                            <span className="icon"><Icon icon="iwwa:year" className="realIcon" /></span>
                            <span className="title">Yearly transactions</span>
                        </Link>
                    </div>

                </li>

                <li className={statistic ? "statisticWrapper showNav" : "statisticWrapper"}>
                    <a href="/#" onClick={openStatisticNav}>
                        <span className="icon"><Icon icon="tabler:report-analytics" className="realIcon" /></span>
                        <span className="title">Statistics</span>
                    </a>
                    <div className="subNav">
                        <Link to="/statistics/weekly">
                            <span className="icon"><Icon icon="fa-solid:calendar-day" className="realIcon" /></span>
                            <span className="title">Weekly statistics</span>
                        </Link>
                        <Link to="/statistics/monthly">
                            <span className="icon"><Icon icon="bi:calendar2-week-fill" className="realIcon" /></span>
                            <span className="title">Monthly statistics</span>

                        </Link>
                        <Link to="/statistics/yearly">
                            <span className="icon"><Icon icon="iwwa:year" className="realIcon" /></span>
                            <span className="title">Yearly statistics</span>
                        </Link>
                    </div>
                </li>

                <li className={profile ? "profileWrapper showNav" : "profileWrapper"}>
                    <a href="/#" onClick={openProfileNav}>
                        <span className="icon"><Icon icon="healthicons:ui-user-profile" className="realIcon" /></span>
                        <span className="title">Profile</span>
                    </a>
                    <div className="subNav">
                        <Link to="/profile/edit">
                            <span className="icon"><Icon icon="fluent:data-usage-edit-20-regular" className="realIcon" /></span>
                            <span className="title">Edit profile</span>
                        </Link>
                        <Link to="/profile/newPassword">
                            <span className="icon"><Icon icon="ri:lock-password-line" className="realIcon" /></span>
                            <span className="title">New password</span>

                        </Link>
                        <div className="deleteProfile" onClick={() => dispatch(openPopUp())}>
                            <span className="icon"><Icon icon="fluent:person-delete-20-regular" className="realIcon" /></span>
                            <span className="title">Delete profile</span>
                        </div>
                    </div>
                </li>
            </ul>
        </div>
    );
};

export default Menu;