import "./index.css";

const SideBar = ({ business }) => {
    const businessAddress = `${business.address}, ${business.city}, ${business.state} ${business.zipCode}`;

    const list = [
        {
            names: [business.website],
            icon: "arrow-alt-circle-right",
            onClick: () => {}
        },
        {
            names: [business.phoneNumber],
            icon: "phone-volume",
            onClick: null
        },
        {
            names: ["Go to maps", businessAddress],
            icon: "map-pin",
            onClick: () => {}
        }
    ];

    const names = (arr) => {
        return arr.map((ele, idx) => (
            <span className="name" key={idx}>{ele}</span>
        ));
    };

    const sidebar = list.map((ele, idx) => (
        <li key={idx}>
            <button onClick={ele.onClick}>{names(ele.names)}</button>
            <button onClick={ele.onClick}>
                <i className={`fas fa-${ele.icon}`}></i>
            </button>
        </li>
    ));

    return <ul className="side-bar">{sidebar}</ul>;
};

export default SideBar;