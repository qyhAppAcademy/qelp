import "./index.css";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import * as session from "../../../../../store/session";

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
    const dispatch = useDispatch();

    const history = useHistory();

    const logout = () => {
        dispatch(session.logout());
        history.push("/");
    };

    const options = OPTIONS.map((OPTION, idx) => (
        <button
            className="option"
            onClick={idx < OPTIONS.length - 1 ? null : logout}
            key={idx}
        >
            <i className={`fas fa-${OPTION.icon}`}></i>{OPTION.name}
        </button>
    ));

    return <div id="menu">{options}</div>;
};

export default Menu;