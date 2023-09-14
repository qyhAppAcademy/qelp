import React from "react";
import { useHistory } from "react-router-dom";
import { useSelector } from "react-redux";

import SearchBar from "./SearchBar";
import ProfileButton from "./ProfileButton";

import "./index.css";

const GITHUB = "https://github.com/qyhAppAcademy";
const LINKEDIN = "https://www.linkedin.com/in/qiaoyanghan";
const AWS = "https://qelp-seeds.s3.amazonaws.com/icons";

const Navigation = () => {
    const sessionUser = useSelector(state => state.session.user);

    const history = useHistory();

    const sessions = sessionUser ? (
        <ProfileButton user={sessionUser} />
    ) : (
        <>  
            {["Log In", "Sign Up"].map((l) => {
                const label = l.split(" ").map(w => w.toLowerCase()).join("");
                return (
                    <button
                        className={`button ${label}-button`}
                        onClick={() => history.push(`/${label}`)}
                        key={label}
                    >{label}</button>
                );
            })}
            {/* <NavLink to="/login" className="button login-button">Log In</NavLink>
            <NavLink to="/signup" className="button signup-button">Sign Up</NavLink> */}
        </>
    );

    return (
        <nav>
            <div>
                <button 
                    className="nav-title"
                    onClick={() => history.push("/")}
                >
                    qelp<i className="fab fa-yelp"></i>
                </button>
            </div>

            <SearchBar />

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
                {sessions}
            </div>
        </nav>
    );
}

export default Navigation;