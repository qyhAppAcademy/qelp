import React from 'react';
import { useSelector } from 'react-redux';
import { Helmet } from "react-helmet";
import { NavLink } from 'react-router-dom';
import SearchBar from './SearchBar.js';
import ProfileButton from './ProfileButton';
import '../../fontawesome/css/all.min.css';
import './index.css';

const Navigation = ({ setSearchCategory }) => {
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
        <header>
            <Helmet>
                <script defer src="../../fontawesome/js/all.min.js"></script>
            </Helmet>
            <nav>
                <div>
                    <NavLink exact to="/" className="nav-title">
                        <h1><span>qelp</span><i className="fab fa-yelp"></i></h1>
                    </NavLink>
                </div>
                
                <SearchBar setSearchCategory={setSearchCategory} />

                <div className="session-links">
                    {sessionLinks}
                </div>
            </nav>
        </header>
    );
}

export default Navigation;