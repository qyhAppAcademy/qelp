import React from "react";
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

    return sessionUser ? (
        <Redirect to="/" />
    ) : (
        <>
            <div className="session-page-header">
                <h1><a href="/">qelp<i class="fab fa-yelp"></i></a></h1>
            </div>
            <div className="session-page-body">
                <div class="session-page-body-column">
                    <div className="session-form-container">
                        <div class="session-form-header">
                            <h2>Sign Up for Qelp</h2>
                            <p class="subheading">
                                Connect with great local businesses
                            </p>
                            <p class="legal-copy">
                                By continuing, you agree to Qelp’s <a class="legal-link" href="https://www.yelp.com/static?p=tos">Terms of Service</a> and acknowledge Qelp’s <a class="legal-link" href="https://www.yelp.com/tos/privacy_policy">Privacy Policy</a>.
                            </p>
                        </div>
                        <ul class="qlist">
                            <li class="demo-login">
                                <button type="submit" className="qbtn demo-btn" onClick={demoLogin}>
                                    <span>
                                        <i class="fas fa-user"></i>
                                    </span>
                                    Continue with Demo User
                                </button>
                            </li>
                        </ul>
                        <p class="legal-copy">Don't worry, we never post without your permission.</p>
                        <fieldset class="hr-line">
                            <legend align="center">OR</legend>
                        </fieldset>
                        <SignupForm />
                        <div class="sub-text-box">
                            <small class="subtle-text">Already on Qelp? <a href="/login">Log in</a></small>
                        </div>
                    </div>
                </div>
                <div class="session-page-body-column">
                    <div class="session-picture-container">
                        <img src="https://s3-media0.fl.yelpcdn.com/assets/2/www/img/7922e77f338d/signup/signup_illustration.png" alt="" />
                    </div>
                </div>
            </div>
        </>
    );
}


export default SignupFormPage;