import "./BusinessHeader.css";

const convertToEst = (time) => {
    if (time === 12) {
        return "12:00 PM";
    }
    else if (time === 24 || time === 0) {
        return "12:00 AM";
    }
    else if (time < 12) {
        return `${time}:00 AM`;
    }
    else {
        return `${time % 12}:00 PM`;
    }
}

const BusinessHeader = ({ business }) => {
    const open = new Date(business.open);
    const close = new Date(business.close);
    const openHr = open.getUTCHours();
    const closeHr = close.getUTCHours() > openHr ? close.getUTCHours() : close.getUTCHours() + 24;

    const now = new Date(Date().toLocaleString("en-US"));
    const nowHr = now.getUTCHours();
    const offset = 5;

    let openHrEst = convertToEst(openHr - offset);
    let closeHrEst = convertToEst(closeHr - offset);

    return (
        <div className="business-header-layer">
            <div className="business-header">
                <div>
                    <h1>{business.name}</h1>
                </div>
                <div className="business-header-item">
                    <span>{business.price}</span>
                    <span className="icon-circle-container"><i className="fas fa-circle"></i></span>
                    <span>{business.category}</span>
                </div>
                <div className="business-header-item">
                    <span>{nowHr >= openHr && nowHr < closeHr ? "Open" : "Close"}</span>
                    <span>{openHrEst} - {closeHrEst}</span>
                </div>
            </div>
        </div>
    );
}

export default BusinessHeader;