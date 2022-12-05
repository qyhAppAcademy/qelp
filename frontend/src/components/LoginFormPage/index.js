import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
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

    return sessionUser ? (
        <Redirect to="/" />
    ) : (
        <>
            <div className="session-page-header">
                    <h1><a href="/">qelp<i className="fab fa-yelp"></i></a></h1>
            </div>
            <div className="session-page-body">
                <div className="session-page-body-column">
                    <div className="session-form-container">
                        <div className="session-form-header">
                            <h2>Log in to Qelp</h2>
                            <p className="subheading">
                                New to Qelp? <a href="/signup">Sign up</a>
                            </p>
                            <p className="legal-copy">
                                By logging in, you agree to Qelp’s <a className="legal-link" href="https://www.yelp.com/static?p=tos">Terms of Service</a> and <a className="legal-link" href="https://www.yelp.com/tos/privacy_policy">Privacy Policy</a>.
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
                        <fieldset className="hr-line">
                            <legend align="center">OR</legend>
                        </fieldset>
                        <LoginForm />
                        <div className="sub-text-box">
                            <small className="subtle-text">New to Qelp? <a href="/signup">Sign up</a></small>
                        </div>
                    </div>
                </div>
                <div className="session-page-body-column">
                    <div className="session-picture-container">
                        <img src="https://s3-media0.fl.yelpcdn.com/assets/2/www/img/7922e77f338d/signup/signup_illustration.png" alt="" />
                    </div>
                </div>
            </div>
        </>
    );
}


export default LoginFormPage;