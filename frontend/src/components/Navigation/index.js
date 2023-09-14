import React from "react";
import { NavLink, useHistory } from "react-router-dom";
import { useSelector } from "react-redux";

import SearchBar from "./SearchBar";
import ProfileButton from "./ProfileButton";

import "./index.css";

const GITHUB = "https://github.com/qyhAppAcademy";
const LINKEDIN = "https://www.linkedin.com/in/qiaoyanghan";
const AWS = "https://qelp-seeds.s3.amazonaws.com/icons";

const Navigation = ({ setKeywordQuery, setAddressQuery }) => {
    const sessionUser = useSelector(state => state.session.user);

    const history = useHistory();

    const labels = ["Log In", "Sign Up"];
    const ls = labels.map((label) => (
        <button
            className={`button ${label.split(" ").map(w => w.toLowerCase()).join("")}-button`}
            onClick={() => {
                history.push(`/${label.split(" ").map(w => w.toLowerCase()).join("")}`);
            }}
        >
            {label.split(" ").map(w => w.toLowerCase()).join("")}
        </button>
    ));

    const sessionLinks = sessionUser ? (
        <ProfileButton user={sessionUser} />
    ) : (
        <>  
            {ls}
            {/* <NavLink to="/login" className="button login-button">Log In</NavLink>
            <NavLink to="/signup" className="button signup-button">Sign Up</NavLink> */}
        </>
    );

    return (
        <nav>
            <div>
                <NavLink exact to="/" className="nav-title">
                    qelp<i className="fab fa-yelp"></i>
                </NavLink>
            </div>

            <SearchBar
                setKeywordQuery={setKeywordQuery}
                setAddressQuery={setAddressQuery}
            />

            <div>
                <a 
                    className="icon"
                    href={`${GITHUB}`}
                    target="_blank"
                    rel="noreferrer"
                >
                    <img src={`${AWS}/github.png`} alt="" />
                </a>
                <a 
                    className="icon" 
                    href={`${LINKEDIN}`}
                    target="_blank"
                    rel="noreferrer"
                >
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