import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import './Navigation.css';
import '../../fontawesome/css/all.min.css';
import { Helmet } from "react-helmet";
import SearchBar from './SearchBar.js';

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
        <>
            <Helmet>
                <script defer src="../../fontawesome/js/all.min.js"></script>
            </Helmet>
            <header className="site-header">
                <div className='nav-container'>
                    <div style={{"display": "flex", "alignItems": "center", "minWidth": "527px"}}>
                        <NavLink exact to="/" className="nav-title">
                            <div className='nav-logo'>
                                <h1><span>qelp</span><i className="fab fa-yelp"></i></h1>
                            </div>
                        </NavLink>
                        <div style={{ display: "inline-block" }}>
                            <SearchBar />
                        </div>
                    </div>

                    <div className="session-links">
                        {sessionLinks}
                    </div>
                </div>
            </header>
        </>
    );
}

export default Navigation;