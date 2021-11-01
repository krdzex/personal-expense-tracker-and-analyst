import React, { useState } from 'react';
import { signin } from "../../auth/authApi"
import auth from "../../auth/authHelper"
import { Redirect } from "react-router-dom"
import { GoogleLogin } from 'react-google-login';
import { useDispatch } from 'react-redux';
const SignIn = () => {

    const [firstTime, setFirstTime] = useState(true)
    const [values, setValues] = useState({
        email: "",
        password: "",
        redirect: false
    })
    const [errors, setErrors] = useState({})


    const onSubmit = (e) => {
        e.preventDefault();
        const user = {
            email: values.email || undefined,
            password: values.password || undefined,
        }


        signin(user).then((data) => {
            if (firstTime) {
                document.getElementById("form2").className += "afterFirst"
                setFirstTime(false)
            }
            if (!data.token) {
                setErrors(data)
            } else {
                auth.authenticate(data, () => {
                    setErrors({})
                    setValues({ ...values, redirect: true })

                })
            }
        })
    }
    const onChangeValue = name => event => {
        setValues({ ...values, [name]: event.target.value })
    }

    if (values.redirect) return <Redirect to={"/"} />
    return (
        <div className="form signinForm " id="form2">
            <form onSubmit={onSubmit}>
                <h3>Sign In</h3>
                <input type="text" placeholder="Email address" className={errors.email ? "error" : "success"} onChange={onChangeValue("email")} value={values.email} />
                {errors.email && (<span>{errors.email}</span>)}
                <input type="password" placeholder="Password" className={errors.password ? "error" : "success"} onChange={onChangeValue("password")} value={values.password} />
                {errors.password && (<span>{errors.password}</span>)}
                <input type="submit" value="Login"></input>
            </form>

        </div>
    );
};

export default SignIn;