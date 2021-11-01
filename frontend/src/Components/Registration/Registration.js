import React from 'react';
import SignIn from './SignIn';
import SignUp from './SignUp';
import { useDispatch,useSelector } from 'react-redux';
import { openSignIn, openSignUp } from '../../Actions';
const Registration = (props) => {
    const dispatch = useDispatch()

    const active = useSelector(state => state.registrationReducer)

    return (
        <div className={active ? "signInWrapper active" : "signInWrapper"}>
            <div className={active ? "container active" : "container"}>
                <div className="blueBg">
                    <div className="box signin">
                        <h2>Already have an Account?</h2>
                        <button className="signinBtn" onClick={()=>dispatch(openSignIn())}>Sign in</button>
                    </div>
                    <div className="box signup">
                        <h2>Don't have an Account?</h2>
                        <button className="signinBtn" onClick={()=>dispatch(openSignUp())}>Sign Up</button>
                    </div>
                </div>
                <div className={active ? "formBx active" : "formBx"}>
                    <SignIn />
                    <SignUp />
                </div>
            </div>
        </div>
    );
};

export default Registration;