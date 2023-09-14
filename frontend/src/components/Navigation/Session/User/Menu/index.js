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
    const options = OPTIONS.map((OPTION, idx) => (
        <li key={idx}>
            <div className="list-item" style={{ cursor: "not-allowed" }}>
                <div className="icon-container">
                    <i style={{ fontSize: "22px" }} className={`fas fa-${OPTION.icon}`}></i>
                </div>
                <div className="text-container">
                    <span>{OPTION.name}</span>
                </div>
            </div>
        </li>
    ));

    return (
        <ul className="profile-dropdown">
            {options}
        </ul>
    );
}

export default Menu;