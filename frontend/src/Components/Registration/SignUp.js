import React, { useState } from 'react';
import { createUser } from "../../apiService/userApi"
import { useDispatch } from 'react-redux';
import { openSignIn } from '../../Actions';
const SignUp = () => {
    const dispatch = useDispatch()
    const [firstTime, setFirstTime] = useState(true)
    const [values, setValues] = useState({
        firstName: "",
        lastName: "",
        nickName: "",
        email: "",
        password: "",
        confirmPassword: "",
        redirect: false
    })
    const [errors, setErrors] = useState({})
    const onSubmit = (e) => {
        e.preventDefault();
        const user = {
            firstName: values.firstName || undefined,
            lastName: values.lastName || undefined,
            nickName: values.nickName || undefined,
            email: values.email || undefined,
            password: values.password || undefined,
            confirmPassword: values.confirmPassword || undefined,
        }
        if (firstTime) {
            document.getElementById("form").className += "afterFirst"
            setFirstTime(false)
        }

        createUser(user).then((data) => {
            if (!data.message) {
                setErrors(data)
            } else {
                setErrors({})
                dispatch(openSignIn())
            }
        })
    }
    const onChangeValue = name => event => {
        setValues({ ...values, [name]: event.target.value })
    }

    return (
        <div className="form signupForm " id="form">
            <form onSubmit={onSubmit}>
                <h3>Sign Up</h3>
                <input type="text" placeholder="First Name" className={errors.firstName ? "error" : "success"} onChange={onChangeValue("firstName")} value={values.firstName} />
                {errors.firstName && (<span>{errors.firstName}</span>)}
                <input type="text" placeholder="Last Name" className={errors.lastName ? "error" : "success"} onChange={onChangeValue("lastName")} value={values.lastName} />
                {errors.lastName && (<span>{errors.lastName}</span>)}
                <input type="text" placeholder="Nickname" className={errors.nickName ? "error" : "success"} onChange={onChangeValue("nickName")} value={values.nickName} />
                {errors.nickName && (<span>{errors.nickName}</span>)}
                <input type="text" placeholder="Email address" className={errors.email ? "error" : "success"} onChange={onChangeValue("email")} value={values.email} />
                {errors.email && (<span>{errors.email}</span>)}
                <input type="password" placeholder="Password" className={errors.password ? "error" : "success"} onChange={onChangeValue("password")} value={values.password} />
                {errors.password && (<span>{errors.password}</span>)}
                <input type="password" placeholder="Confirm Password" className={errors.confirmPassword ? "error" : "success"} onChange={onChangeValue("confirmPassword")} value={values.confirmPassword} />
                {errors.confirmPassword && (<span>{errors.confirmPassword}</span>)}
                <input type="submit" value="Register" />
            </form>
        </div>
    );
};

export default SignUp;