import React from 'react';
import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import SearchBar from './SearchBar.js';
import ProfileButton from './ProfileButton';
import './index.css';
import './NavTitle.css';
import './Icon.css';
import './AuthButton.css';
import './Responsive.css';

const GITHUB = "https://github.com/qyhAppAcademy";
const LINKEDIN = "https://www.linkedin.com/in/qiaoyanghan";
const AWS = "https://qelp-seeds.s3.amazonaws.com/icons";

const Navigation = ({ setQuery, setAddressQuery }) => {
    const sessionUser = useSelector(state => state.session.user);

    let sessionLinks;

    if (sessionUser) {
        sessionLinks = (
            <ProfileButton user={sessionUser} />
        );
    } else {
        sessionLinks = (
            <>
                <NavLink to="/login" className="button login-button">Log In</NavLink>
                <NavLink to="/signup" className="button signup-button">Sign Up</NavLink>
            </>
        );
    }

    return (
        <nav>
            <div>
                <NavLink exact to="/" className="nav-title">
                    qelp<i className="fab fa-yelp"></i>
                </NavLink>
            </div>

            <SearchBar setQuery={setQuery} setAddressQuery={setAddressQuery} />

            {/* <div>
                <a href={`${GITHUB}`} target="_blank" rel="noreferrer">
                    <img className="icon" src={`${AWS}/github.png`} alt="" />
                </a>
                <a href={`${LINKEDIN}`} target="_blank" rel="noreferrer">
                    <img className="icon" src={`${AWS}/linkedin.png`} alt="" />
                </a>
            </div> */}

            <div className="session-links">
                {sessionLinks}
            </div>
        </nav>
    );
}

export default Navigation;