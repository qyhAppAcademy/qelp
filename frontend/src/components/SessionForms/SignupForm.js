import React, { useEffect } from "react";
import * as sessionActions from "../../store/session";
import { useInput, useSubmit } from "../../hooks";
import { Input } from "../Forms";
import "./SessionForm.css";

const SignupForm = ({ onSuccess, setShowAlert, setErrors }) => {
    const [email, onEmailChange] = useInput("");
    // const [username, onUsernameChange] = useInput("");
    const [password, onPasswordChange] = useInput("");
    const [confirmPassword, onConfirmPasswordChange] = useInput("");
    const [errors, onSubmit] = useSubmit({
        onSuccess,
        action: sessionActions.signup({ email, password }),
        validate: () => {
            if (password !== confirmPassword) {
                return ['Confirm Password field must be the same as the Password field'];
            }
        }
    });

    useEffect(() => {
        if (errors.length > 0) {
            setErrors(errors);
            setShowAlert(true);
        }
    }, [setErrors, setShowAlert, errors]);

    return (
        <form onSubmit={onSubmit} className="form">
            <Input
                type="email"
                placeholder="Email"
                value={email}
                onChange={onEmailChange}
                required
            />
            <Input
                type="password"
                placeholder="Password"
                value={password}
                onChange={onPasswordChange}
                required
            />
            <Input
                type="password"
                placeholder="Confirm Password"
                value={confirmPassword}
                onChange={onConfirmPasswordChange}
                required
            />
            <button type="submit" className="qbtn qbtn-signup">Sign Up</button>
        </form>
    );
}

export default SignupForm;