import React from 'react';
import { useSelector } from 'react-redux';
import { Helmet } from "react-helmet";
import { NavLink } from 'react-router-dom';
import SearchBar from './SearchBar.js';
import ProfileButton from './ProfileButton';
import './index.css';

const Navigation = ({ setQuery }) => {
    const sessionUser = useSelector(state => state.session.user);

    let sessionLinks;

    if (sessionUser) {
        sessionLinks = (
            <ProfileButton user={sessionUser} />
        );
    } else {
        sessionLinks = (
            <>
                <NavLink to="/login" className="login-button">Log In</NavLink>
                <NavLink to="/signup" className="signup-button">Sign Up</NavLink>
            </>
        );
    }

    return (
        <>
            <Helmet>
                <script defer src="../../fontawesome/js/all.min.js"></script>
            </Helmet>
            <nav>
                <div>
                    <NavLink exact to="/" className="nav-title">
                        <h1><span>qelp</span><i className="fab fa-yelp"></i></h1>
                    </NavLink>
                </div>
                
                <SearchBar setQuery={setQuery} />

                <div>
                    <a href="https://github.com/qyhAppAcademy/" className="github-link">
                        <img src="https://qelp-seeds.s3.amazonaws.com/icons/1.png" alt="" style={{ width: "36px", height: "36px", margin: "3px 10px 0 0" }} />
                    </a>
                    <a href="https://www.linkedin.com/in/qiao-yang-han-367590257" className="linkedin-link">
                        <img src="https://qelp-seeds.s3.amazonaws.com/icons/2.png" alt="" style={{ width: "36px", height: "36px", margin: "3px 0 0 0" }} />
                    </a>    
                </div>

                <div className="session-links">
                    {sessionLinks}
                </div>
            </nav>
        </>
    );
}

export default Navigation;