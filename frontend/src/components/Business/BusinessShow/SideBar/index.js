import { useHistory } from "react-router-dom";
import "./index.css";

const SideBar = ({ business }) => {
    const history = useHistory();

    const businessAddress = `${business.address}, ${business.city}, ${business.state} ${business.zipCode}`;

    const list = [
        {
            names: [business.website.split("https://www.").join("")],
            icon: "arrow-alt-circle-right",
            onClick: () => window.location.href = business.website
        },
        {
            names: [business.phoneNumber],
            icon: "phone-volume",
            onClick: null
        },
        {
            names: ["Get Directions", businessAddress],
            icon: "map-pin",
            onClick: () => window.location.href = `https://www.google.com/maps?q=${business.lat},${business.lng}`
        }
    ];

    const getNames = (ele) => {
        return ele.names.map((name, idx) => (
            <button
                className="name"
                onClick={idx === 0 ? ele.onClick : null}
                key={idx}
            >
                {name}
            </button>
        ));
    };

    const sidebar = list.map((ele, idx) => (
        <li key={idx}>
            <div>{getNames(ele)}</div>
            <button onClick={ele.onClick}>
                <i className={`fas fa-${ele.icon}`}></i>
            </button>
        </li>
    ));

    return <ul className="side-bar">{sidebar}</ul>;
};

export default SideBar;