import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import { login } from "../../store/session";
import { SignupForm } from "../SessionForms";
import '../SessionForms/SessionFormPage.css';

function SignupFormPage() {
    const sessionUser = useSelector((state) => state.session.user);

    const dispatch = useDispatch();

    const demoLogin = (e) => {
        e.preventDefault();
        const demoUser = {
            credential: "demo@user.io",
            password: "password"
        }
        dispatch(login(demoUser));
    }

    const [showAlert, setShowAlert] = useState(false);
    const [errors, setErrors] = useState([]);

    const closeAlert = () => {
        setShowAlert(false);
    };

    useEffect(() => {
        if (!showAlert) return;
    }, [showAlert]);

    return sessionUser ? (
        <Redirect to="/" />
    ) : (
        <>
            <div className="session-page-header">
                <h1><a href="/">qelp<i className="fab fa-yelp"></i></a></h1>
            </div>
            <div className="session-page-body">
                {showAlert && (
                <div id="session-alert-container">
                    <div className="session-alert session-alert-error">
                        <div className="session-alert-message">
                            <ul>
                                {errors.map(error => <li key={error}>{error}</li>)}
                            </ul>
                        </div>
                        <button className="session-alert-dismiss" onClick={closeAlert}>×</button>
                    </div>
                </div>)}
                <div className="session-page-body-main">
                    <div className="session-page-body-column">
                        <div className="session-form-container">
                            <div className="session-form-header">
                                <h2>Sign Up for Qelp</h2>
                                <p className="subheading">
                                    Connect with great local businesses
                                </p>
                                <p className="legal-copy">
                                    By continuing, you agree to Qelp’s <a className="legal-link" href="https://www.yelp.com/static?p=tos">Terms of Service</a> and acknowledge Qelp’s <a className="legal-link" href="https://www.yelp.com/tos/privacy_policy">Privacy Policy</a>.
                                </p>
                            </div>
                            <ul className="qlist">
                                <li className="demo-login">
                                    <button type="submit" className="qbtn demo-btn" onClick={demoLogin}>
                                        <span>
                                            <i className="fas fa-user"></i>
                                        </span>
                                        Continue with Demo User
                                    </button>
                                </li>
                            </ul>
                            <p className="legal-copy">Don't worry, we never post without your permission.</p>
                            <fieldset className="hr-line">
                                <legend align="center">OR</legend>
                            </fieldset>
                                <SignupForm setShowAlert={setShowAlert} setErrors={setErrors} />
                            <div className="sub-text-box">
                                <small className="subtle-text">Already on Qelp? <a href="/login">Log in</a></small>
                            </div>
                        </div>
                    </div>
                    <div className="session-page-body-column">
                        <div className="session-picture-container">
                            <img src="https://s3-media0.fl.yelpcdn.com/assets/2/www/img/7922e77f338d/signup/signup_illustration.png" alt="" />
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}


export default SignupFormPage;