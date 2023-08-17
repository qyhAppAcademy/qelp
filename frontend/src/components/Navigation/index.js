import React from 'react';
import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import SearchBar from './SearchBar';
import ProfileButton from './ProfileButton';
import './index.css';

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

            <div>
                <a className="icon" href={`${GITHUB}`} target="_blank" rel="noreferrer">
                    <img src={`${AWS}/github.png`} alt="" />
                </a>
                <a className="icon" href={`${LINKEDIN}`} target="_blank" rel="noreferrer">
                    <img src={`${AWS}/linkedin.png`} alt="" />
                </a>
            </div>

            <div className="session-links">
                {sessionLinks}
            </div>
        </nav>
    );
}

export default Navigation;