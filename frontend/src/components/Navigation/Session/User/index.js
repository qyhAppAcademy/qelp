import "./index.css";
import { useRef, useState, useEffect } from "react";
import Profile from "./Profile";
import Menu from "./Menu";

const User = () => {
    const ref = useRef();

    const [showMenu, setShowMenu] = useState(false);

    const toggleMenu = () => {
        setShowMenu(!showMenu);
    };

    useEffect(() => {
        if (!showMenu) return;

        const closeMenu = (e) => {
            if (showMenu && !ref.current.contains(e.target)) {
                setShowMenu(false);
            }
        };

        document.addEventListener('click', closeMenu);

        return () => document.removeEventListener("click", closeMenu);
    }, [showMenu]);

    return (
        <div ref={ref} className="session">
            <Profile toggleMenu={toggleMenu} />
            {showMenu && <Menu />}
        </div>
    );
};

export default User;