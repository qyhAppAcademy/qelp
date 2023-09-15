import { useState, useEffect } from "react";
import Profile from "./Profile";
import Menu from "./Menu";
import "./index.css";

const User = () => {
    const [showMenu, setShowMenu] = useState(false);

    return (
        <div className='profile-button'>
            <Profile showMenu={showMenu} setShowMenu={setShowMenu} />
            {showMenu && <Menu />}
        </div>
    );
}

export default User;