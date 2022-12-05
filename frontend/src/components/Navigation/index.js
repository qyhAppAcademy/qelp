import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import './Navigation.css';

function Navigation() {
    const sessionUser = useSelector(state => state.session.user);

    let sessionLinks;
    if (sessionUser) {
        sessionLinks = (
            <ProfileButton user={sessionUser} />
        );
    } else {
        sessionLinks = (
            <>
                <NavLink to="/login" className="button">Log In</NavLink>
                <NavLink to="/signup" className="button">Sign Up</NavLink>
            </>
        );
    }

    return (
        <header className="site-header">
            <NavLink exact to="/" className="nav-title">
                <h1>Qelp</h1>
            </NavLink>
            <div className="session-links">
                {sessionLinks}
            </div>
        </header>
    );
}

export default Navigation;