import { useState, useEffect } from "react";
import Menu from "./Menu";
import "./index.css";

const User = () => {
    return (
        <div className='profile-button'>

            {showMenu && <Menu />}
        </div>
    );
}

export default User;