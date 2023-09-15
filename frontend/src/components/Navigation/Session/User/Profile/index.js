import "./index.css";

const Profile = ({ toggleMenu }) => {
    return (
        <button className="profile" onClick={toggleMenu}>
            <i className="fas fa-user-circle"></i>
        </button>
    );
};

export default Profile;