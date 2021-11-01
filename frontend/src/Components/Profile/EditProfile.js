import { Icon } from '@iconify/react';
import React, { useEffect, useState } from 'react';
import { getUserInfo, updateProfile } from '../../apiService/userApi';
import auth from '../../auth/authHelper';

const EditProfile = () => {

    const [values, setValues] = useState({
        firstName: "",
        lastName: "",
        nickName: ""
    })
    const [firstTime, setFirstTime] = useState(true)
    const [errors, setErrors] = useState({})

    useEffect(() => {
        getUserInfo(auth.isAuthentcated().user._id)
            .then(response => setValues({ firstName: response.firstName, lastName: response.lastName, nickName: response.nickName }))
            .catch(reason => console.log(reason))

    }, [])

    const [active, setActive] = useState({
        firstName: false,
        lastName: false,
        nickName: false
    })

    const onEditClick = (value, oppositeValue) => {
        setActive({ ...active, [value]: !oppositeValue })
    }

    const onChangeValue = name => event => {
        setValues({ ...values, [name]: event.target.value })
    }

    const onSubmit = () => {
        updateProfile(auth.isAuthentcated().user._id, values)
            .then(response => {
                if (!response._id) {
                    setErrors(response)
                } else {
                    setErrors({})
                    setActive({
                        firstName: false,
                        lastName: false,
                        nickName: false
                    })
                }
                if (firstTime) {
                    document.getElementById("editWrapper").className += " afterFirst"
                    setFirstTime(false)
                }
            })
            .catch(reason => console.log(reason))


    }

    const onCancel = () => {
        setActive({
            firstName: false,
            lastName: false,
            nickName: false
        })
        getUserInfo(auth.isAuthentcated().user._id)
            .then(response => setValues({ firstName: response.firstName, lastName: response.lastName, nickName: response.nickName }))
            .catch(reason => console.log(reason))
        setErrors({})
    }
    return (
        <div className="editWrapper" id="editWrapper">
            <div className={active.firstName || active.lastName || active.nickName ? "editForm active" : "editForm"}>
                <h2>Edit profile</h2>
                <div className="firstFormFirstName">
                    <h3>First name:</h3>
                    <div className={active.firstName ? "activeEdit" : "edit"} style={errors.firstName ? { marginTop: "20px" } : {}}>
                        <p>{values.firstName}</p>
                        <input type="text" className={errors.firstName ? "error" : "success"} value={values.firstName} onChange={onChangeValue("firstName")} />
                        {errors.firstName && (<span>{errors.firstName}</span>)}
                    </div>
                    <div className={active.firstName ? "hideIcon" : "editIcon"} onClick={() => onEditClick("firstName", active.firstName)}>
                        <Icon icon="ci:edit" id="edit" />
                    </div>
                </div>
                <div className="firstFormLastName">
                    <h3>Last name:</h3>
                    <div className={active.lastName ? "activeEdit" : "edit"} style={errors.lastName ? { marginTop: "20px" } : {}}>
                        <p>{values.lastName}</p>
                        <input type="text" className={errors.lastName ? "error" : "success"} value={values.lastName} onChange={onChangeValue("lastName")} />
                        {errors.lastName && (<span>{errors.lastName}</span>)}
                    </div>

                    <div className={active.lastName ? "hideIcon" : "editIcon"} onClick={() => onEditClick("lastName", active.lastName)}>
                        <Icon icon="ci:edit" id="edit" />
                    </div>
                </div>
                <div className="firstFormNickName">
                    <h3>Nick name:</h3>
                    <div className={active.nickName ? "activeEdit" : "edit"} style={errors.nickName ? { marginTop: "20px" } : {}}>
                        <p>{values.nickName}</p>
                        <input type="text" className={errors.nickName ? "error" : "success"} value={values.nickName} onChange={onChangeValue("nickName")} />
                        {errors.nickName && (<span>{errors.nickName}</span>)}
                    </div>

                    <div className={active.nickName ? "hideIcon" : "editIcon"} onClick={() => onEditClick("nickName", active.nickName)}>
                        <Icon icon="ci:edit" id="edit" />
                    </div>
                </div>
                <div className="buttons">
                    <button id="cancel" onClick={() => onCancel()}>Cancel</button>
                    <button id="change" onClick={() => onSubmit()}>Change</button>
                </div>
            </div>
        </div >
    );
};

export default EditProfile;