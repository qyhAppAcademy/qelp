import React, { useState, useEffect } from "react";
import { useDispatch } from 'react-redux';
import { useHistory } from "react-router-dom";
import * as sessionActions from '../../store/session';
import "./ProfileButton.css";

const ProfileButton = ({ user }) => {
    const dispatch = useDispatch();
    const [showMenu, setShowMenu] = useState(false);

    const history = useHistory();

    const openMenu = () => {
        if (showMenu) return;
        setShowMenu(true);
    };

    useEffect(() => {
        if (!showMenu) return;

        const closeMenu = () => {
            setShowMenu(false);
        };

        document.addEventListener('click', closeMenu);

        return () => document.removeEventListener("click", closeMenu);
    }, [showMenu]);

    const logout = (e) => {
        e.preventDefault();
        dispatch(sessionActions.logout());
        history.push("/");
    };

    return (
        <div className='profile-button'>
            <button onClick={openMenu} className='profile-icon'>
                <span>
                    <i style={{ fontSize: "36px" }} className="fas fa-user-circle"></i>
                </span>
            </button>
            {showMenu && (
                <ul className="profile-dropdown">
                    <li>
                        <div className="list-item">
                            <div className="icon-container"><i style={{ fontSize: "22px" }} className="fas fa-user-astronaut"></i></div>
                            <div className="text-container"><span>User Profile</span></div>
                        </div>
                    </li>
                    <li>
                        <div className="list-item">
                            <div className="icon-container"><i style={{ fontSize: "22px" }} className="fas fa-cog"></i></div>
                            <div className="text-container"><span>Account Settings</span></div>
                        </div>
                    </li>
                    <li>
                        <div className="list-item" onClick={logout}>
                            <div className="icon-container"><i style={{ fontSize: "22px" }} className="fas fa-sign-out-alt"></i></div>
                            <div className="text-container"><span>Log Out</span></div>
                        </div>
                    </li>
                </ul>
            )}
        </div>
    );
}

export default ProfileButton;