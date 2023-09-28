import "./index.css"

export const NewSideBar = ({ business }) => {
    const list = [
        {
            name: business.website,
            icon: "arrow-alt-circle-right",
            onClick: () => {}
        },
        {
            name: business.phoneNumber,
            icon: "phone-volume",
            onClick: null
        },
        {
            name: "Go to maps",
            icon: "map-pin",
            onClick: () => {}
        }
    ];

    const sidebar = list.map((ele, idx) => (
        <li key={idx}>
            <button type="" onClick={ele.onClick}>
                {ele.name}
                {idx === list.length - 1 ?
                    `${business.address}, ${business.city}, ${business.state} ${business.zipCode}` : ""}
            </button>
            <span>
                <i style={{ fontSize: "1.5vw" }} className={`fas fa-${ele.icon}`}></i>
            </span>
        </li>
    ));

    return (
        <ul className="side-bar">
            {sidebar}
        </ul>
    );
};

const SideBar = ({ business }) => {
    return (
        <ul className="business-show-page-side-bar">
            <li className="business-show-page-side-bar-item">
                <div>
                    <p>
                        <a href={`${business.website}`} target="_blank" rel="noreferrer">
                            {business.website}
                        </a>
                    </p>
                    <span>
                        <a href={`${business.website}`} target="_blank" rel="noreferrer">
                            <i style={{ fontSize: "1.5vw" }} className="fas fa-arrow-alt-circle-right"></i>
                        </a>
                    </span>
                </div>
            </li>
            <li className="business-show-page-side-bar-item">
                <div>
                    <p>
                        {business.phoneNumber}
                    </p>
                    <span>
                        <i style={{ fontSize: "1.5vw" }} className="fas fa-phone-volume"></i>
                    </span>
                </div>
            </li>
            <li className="business-show-page-side-bar-item">
                <div>
                    <div>
                        <a href={`https://www.google.com/maps?q=${business.lat},${business.lng}`} target="_blank" rel="noreferrer">
                            Get Directions
                        </a>
                        <p>
                            {`${business.address}, ${business.city}, ${business.state} ${business.zipCode}`}
                        </p>
                    </div>
                    <span>
                        <a href={`https://www.google.com/maps?q=${business.lat},${business.lng}`} target="_blank" rel="noreferrer">
                            <i style={{ fontSize: "1.5vw" }} className="fas fa-map-pin"></i>
                        </a>
                    </span>
                </div>
            </li>
        </ul>
    );
};

export default SideBar;