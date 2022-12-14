import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect, NavLink } from "react-router-dom";
import { login } from "../../store/session";
import { LoginForm } from "../SessionForms";
import '../SessionForms/SessionFormPage.css';

const LoginFormPage = () => {
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
                <NavLink exact to="/">
                    <h1>qelp<i style={{ padding: "0 0 0 3px" }} className="fab fa-yelp"></i></h1>
                </NavLink>
            </div>
            <div className="session-page-body">
                {showAlert && (
                <div id="session-alert-container">
                    <div className="session-alert session-alert-error">
                        <div className="session-alert-message">
                            <ul>
                                <li>
                                    The email address or password you entered is incorrect.
                                </li>
                            </ul>
                        </div>
                        <button className="session-alert-dismiss" onClick={closeAlert}>×</button>
                    </div>
                </div>)}
                <div className="session-page-body-main">
                    <div className="session-page-body-column">
                        <div className="session-form-container">
                            <div className="session-form-header">
                                <h2>Log in to Qelp</h2>
                                <p className="subheading">
                                    New to Qelp? <NavLink exact to="/signup">Sign up</NavLink>
                                </p>
                                <p className="legal-copy">
                                    By logging in, you agree to view Qelp creator's <a className="legal-link" href="https://github.com/qyhAppAcademy">Github</a> and <a className="legal-link" href="https://www.linkedin.com/in/qiao-yang-han-367590257/">LinkedIn</a>.
                                </p>
                            </div>
                            <ul className="qlist">
                                <li className="demo-login">
                                    <button type="submit" className="qbtn demo-btn" onClick={demoLogin}>
                                        <span>
                                            <i style={{ fontSize: "18px" }} className="fas fa-user"></i>
                                        </span>
                                        Continue with Demo User
                                    </button>
                                </li>
                            </ul>
                            <fieldset className="hr-line">
                                <legend align="center">OR</legend>
                            </fieldset>
                            <LoginForm setShowAlert={setShowAlert} />
                            <div className="sub-text-box">
                                    <small className="subtle-text">New to Qelp? <NavLink exact to="/signup">Sign up</NavLink></small>
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


export default LoginFormPage;