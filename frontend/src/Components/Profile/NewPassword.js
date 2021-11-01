import { Icon } from '@iconify/react';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { updatePassword } from '../../apiService/userApi';
import authHelper from '../../auth/authHelper';
import auth from '../../auth/authHelper';

const NewPassword = () => {

    const [values, setValues] = useState({
        oldPassword: "",
        newPassword: "",
        confirmPassword: "",
    })
    const [timer, setTimer] = useState(5)
    const [errors, setErrors] = useState({})
    const [firstTime, setFirstTime] = useState(true)
    const [success, setSucces] = useState(false)
    const onChange = name => event => {
        setValues({ ...values, [name]: event.target.value })
    }

    const onSubmit = (e) => {
        e.preventDefault()
        let newValues = {
            oldPassword: values.oldPassword || undefined,
            newPassword: values.newPassword || undefined,
            confirmPassword: values.confirmPassword || undefined
        }
        updatePassword(auth.isAuthentcated().user._id, newValues)
            .then(response => {
                if (!response._id) {
                    setErrors(response)
                } else {
                    setErrors({});
                    setSucces(true)
                    handleClick();
                    setTimeout(() => {
                        authHelper.signOut()
                        window.location.reload();
                    }, 5000);
                }
                if (firstTime) {
                    document.getElementById("passwordForm").className += " afterFirst"
                    setFirstTime(false)
                }
            })
            .catch(reason => console.log(reason))
    }

    const handleClick = () => {
        setInterval(() => {
            setTimer(timer => timer - 1);
        }, 1000);
    }


    return (
        <div className="passwordWrapper">
            {success ?
                <div className="successPassword">
                    <div className="icon">
                        <Icon icon="el:ok-circle" className="realIcon" />
                    </div>
                    <h2>Password changed</h2>
                    <p>You will be logged out in</p>
                    <div className="middle">
                        <div className="circle">{timer}</div>
                    </div>

                </div> :
                <div className="passwordForm" id="passwordForm">
                    <form onSubmit={(e) => onSubmit(e)}>
                        <h3>Password changer</h3>
                        <div className={values.oldPassword === "" ? "inputBox" : "inputBox active"}>
                            <input type="password" className={errors.oldPassword ? "error" : "success"} value={values.oldPassword} onChange={onChange("oldPassword")} />
                            <span>Old password</span>
                            <p>{errors.oldPassword}</p>
                        </div>
                        <div className={values.newPassword === "" ? "inputBox" : "inputBox active"}>
                            <input type="password" className={errors.newPassword ? "error" : "success"} value={values.newPassword} onChange={onChange("newPassword")} />
                            <span>New password</span>
                            <p>{errors.newPassword}</p>
                        </div>
                        <div className={values.confirmPassword === "" ? "inputBox last" : "inputBox active last"}>
                            <input type="password" className={errors.confirmPassword ? "error" : "success"} value={values.confirmPassword} onChange={onChange("confirmPassword")} />
                            <span>Confirm password</span>
                            <p>{errors.confirmPassword}</p>
                        </div>
                        <div className="buttons">
                            <Link to="/">Cancel</Link>
                            <input type="submit" />
                        </div>
                    </form>
                </div>}
        </div>
    );
};

export default NewPassword;
