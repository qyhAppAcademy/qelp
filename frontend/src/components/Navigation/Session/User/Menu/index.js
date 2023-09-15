import React, { useState, useEffect } from "react";
import { useDispatch } from 'react-redux';
import { useHistory } from "react-router-dom";
import * as session from '../../../../../store/session';
import "./index.css";

const OPTIONS = [
    {
        name: "User Profile",
        icon: "user-astronaut"
    },
    {
        name: "Account Settings",
        icon: "cog"
    },
    {
        name: "Log Out",
        icon: "sign-out-alt"
    }
];

const Menu = () => {
    const [showMenu, setShowMenu] = useState(false);

    const openMenu = () => {
        if (showMenu) return;
        setShowMenu(true);
    };

    const closeMenu = () => {
        setShowMenu(false);
    };

    useEffect(() => {
        if (!showMenu) return;

        document.addEventListener('click', closeMenu);

        return () => document.removeEventListener("click", closeMenu);
    }, [showMenu]);

    const dispatch = useDispatch();

    const history = useHistory();

    const logout = () => {
        dispatch(session.logout());
        history.push("/");
    };

    const options = OPTIONS.map((OPTION, idx) => (
        <div
            className="option"
            key={idx}
            onClick={idx < OPTIONS.length - 1 ? null : logout}
        >
            <button>
                <i className={`fas fa-${OPTION.icon}`}></i>
                &nbsp;&nbsp;&nbsp;
                {OPTION.name}
            </button>
        </div>
    ));

    return <div id="menu">{options}</div>;
}

export default Menu;