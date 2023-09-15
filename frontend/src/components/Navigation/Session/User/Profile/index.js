import "./index.css";

const Profile = ({ toggleMenu }) => {
    return (
        <button onClick={toggleMenu} className="profile">
            <i className="fas fa-user-circle"></i>
        </button>
    );
}

export default Profile;