import { useEffect } from "react";

const Profile = ({ showMenu, setShowMenu }) => {
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

    return (
        <button onClick={openMenu} className='profile-icon'>
            <span>
                <i style={{ fontSize: "36px" }} className="fas fa-user-circle"></i>
            </span>
        </button>
    );
}

export default Profile;