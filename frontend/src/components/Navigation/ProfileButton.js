import React, { useState, useEffect } from "react";
import { useDispatch } from 'react-redux';
import * as sessionActions from '../../store/session';

const ProfileButton = ({ user }) => {
    const dispatch = useDispatch();
    const [showMenu, setShowMenu] = useState(false);

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
    };

    return (
        <div className='profile-button'>
            <button onClick={openMenu} className='profile-icon'>
                <span>
                    <i className="fas fa-user-circle"></i>
                </span>
                {/* <div>
                    <button class="header-toggle__09f24__PuNSK header-toggle-mouse-mode__09f24__gey4d css-kma813" aria-label="Toggle Menu" aria-haspopup="menu" aria-controls="header-dropdown-menu" aria-expanded="false" type="submit">
                        <span class="css-15j7fnr">
                            <span class=" display--inline__09f24__c6N_k border-color--default__09f24__NPAKY">
                                <img class=" photo__09f24__jJSwS" src="https://s3-media0.fl.yelpcdn.com/assets/public/default_user_avatar_40x40_v2.yji-1b8b3dd9a1cc11cda816.png" srcset="" alt="Qiao Yang H." height="36" width="36"/>
                            </span>
                        </span>
                    </button>
                </div> */}
            </button>
            {showMenu && (
                <ul className="profile-dropdown">
                    <li>
                        <div className="list-item">
                            <div className="icon-container"><i className="fas fa-user-astronaut"></i></div>
                            <div className="text-container"><span>About Me</span></div>
                        </div>
                    </li>
                    <li>
                        <div className="list-item">
                            <div className="icon-container"><i className="fas fa-cog"></i></div>
                            <div className="text-container"><span>Account Settings</span></div>
                        </div>
                    </li>
                    <li>
                        <div className="list-item">
                            <div className="icon-container"><i className="fas fa-sign-out-alt"></i></div>
                            <div className="text-container"><span><button onClick={logout} className="button">Log Out</button></span></div>
                        </div>
                    </li>
                </ul>
            )}
        </div>
    );
}

export default ProfileButton;