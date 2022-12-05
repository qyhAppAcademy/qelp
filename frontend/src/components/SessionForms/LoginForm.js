import React from "react";
import * as sessionActions from "../../store/session";
import { useInput, useSubmit } from "../../hooks";
import { FormErrors, Input } from "../Forms";
import "./SessionForm.css";

function LoginForm({ onSuccess }) {
    const [credential, onCredentialChange] = useInput("");
    const [password, onPasswordChange] = useInput("");
    const [errors, onSubmit] = useSubmit({
        onSuccess,
        action: sessionActions.login({ credential, password })
    });

    return (
        <form onSubmit={onSubmit} className="form">
            <FormErrors errors={errors} />
            <Input
                // label="Username or Email"
                type="email"
                placeholder="Email"
                value={credential}
                onChange={onCredentialChange}
                required
            />
            <Input
                // label="Password"
                type="password"
                placeholder="Password"
                value={password}
                onChange={onPasswordChange}
                required
            />
            <div className="forgot-password">
                <small><a href="/login" className="forgot-link">Forgot password?</a></small>
            </div>
            <button type="submit" className="qbtn qbtn-login">Log In </button>
        </form>
    );
}

export default LoginForm;