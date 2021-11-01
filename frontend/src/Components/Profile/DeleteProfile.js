import { Icon } from '@iconify/react';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { closePopUp } from '../../Actions';
import { chackPasswordConfirm, removeUser } from '../../apiService/userApi';
import auth from "../../auth/authHelper"
const DeleteProfile = () => {

    const dispatch = useDispatch()
    const [deleteStatus, setDeleteStatus] = useState(true)
    const [afterConfirm, setAfterConfirm] = useState(false)
    const [passwordCorrect, setPasswordCorrect] = useState(false)
    const [firstTime, setFirstTime] = useState(true)
    const [error, setError] = useState(false)
    const [password, setPassword] = useState("")
    const onConfrim = () => {
        setAfterConfirm(true)
        removeUser(auth.isAuthentcated().user._id)
            .then(response => {
                if (response.error) {
                    setDeleteStatus(false)
                } else {
                    setDeleteStatus(true)
                }
            })
            .catch(reason => console.log(reason))
    }

    const onPositivOk = () => {
        auth.signOut();
        window.location.reload();
    }


    const onOkClick = (e) => {
        e.preventDefault()

        chackPasswordConfirm(auth.isAuthentcated().user._id, { password: password })
            .then(response => {
                setError(response.response)
                if (firstTime) {
                    document.getElementById("oldPassword").className += " afterFirst"
                    setFirstTime(false)
                }
                setPasswordCorrect(response.response)
            })
            .catch(reason => console.log(reason))
    }
    const onChange = (e) => {
        setPassword(e.target.value)
    }
    return (
        <div className="deleteWrapper">
            <div className="innerDiv">
                {!passwordCorrect ?
                    <div className="oldPassword" id="oldPassword">
                        <div className="icon">
                            <Icon icon="teenyicons:password-outline" className="realIcon" />
                        </div>
                        <h2>Password confirm</h2>
                        <p>To delete your account,confirm your password!</p>
                        <form onSubmit={onOkClick}>
                            <input type="password" className={error ? "success" : "error"} value={password} onChange={onChange} placeholder="Enter your password" />
                            {!error && (<p>Password is not correct!</p>)}
                            <div className="okBtn">
                                <button type="submit"><Icon icon="el:ok" /></button>
                            </div>
                        </form>
                        <div className="closeBtn" onClick={() => dispatch(closePopUp())}>
                        </div>
                    </div>
                    : afterConfirm ?
                        deleteStatus ? <div className="goodResponse">
                            <div className="icon">
                                <Icon icon="el:ok-circle" className="realIcon" />
                            </div>
                            <h2>Deleted</h2>
                            <p>Your account has been deleted!</p>
                            <div className="buttons">
                                <button onClick={() => onPositivOk()}>OK</button>
                            </div>
                        </div> :
                            <div className="badResponse">
                                <div className="icon">
                                    <Icon icon="subway:error" className="realIcon" />
                                </div>
                                <h2>Error</h2>
                                <p>There has been error, try again!</p>
                                <div className="buttons">
                                    <button onClick={() => dispatch(closePopUp())}>OK</button>
                                </div>
                            </div> :
                        <div className="delete">
                            <div className="icon">
                                <Icon icon="gg:danger" className="realIcon" />
                            </div>
                            <h2>Are you sure?</h2>
                            <p>You will not be able to recover it later!</p>
                            <div className="buttons">
                                <button id="cancel" onClick={() => dispatch(closePopUp())}>No, Cancel it!</button>
                                <button id="confirm" onClick={() => onConfrim()}>Yes, Delete it!</button>
                            </div>
                        </div>}
            </div>
        </div>
    );
};

export default DeleteProfile;