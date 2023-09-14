import React, { useState, useEffect } from "react";
import { useDispatch } from 'react-redux';

import { useHistory } from "react-router-dom";
import * as sessionActions from '../../../../store/session';
import "./ProfileButton.css";

import Menu from "./Menu";

const ProfileButton = () => {
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
            {/* {showMenu && <Menu />} */}
        </div>
    );
}

export default ProfileButton;