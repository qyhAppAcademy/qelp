import "./BusinessIndexItem.css";

const convertToEst = (time) => {
    if (time < 0){
        time += 24;
    }

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

const BusinessIndexItem = ({ idx, business }) => {
    const open = new Date(business.open);
    const close = new Date(business.close);
    let openHr = open.getUTCHours();
    let closeHr = close.getUTCHours() > openHr ? close.getUTCHours() : close.getUTCHours() + 24;

    const now = new Date(Date().toLocaleString("en-US"));
    let nowHr = now.getUTCHours();
    const offset = 5;

    let openHrEst = convertToEst(openHr - offset);
    let closeHrEst = convertToEst(closeHr - offset);

    return (
        <div className="business-index-item">
            <div className="business-index-item-picture">
                <img src={`https://qelp-dev.s3.amazonaws.com/seeds/businesses/${business.id}/1.jpeg`} alt="" />
            </div>
            <div>
                <h1>{`${idx + 1}. ${business.name}`}</h1>
            </div>
            <div style={{ display: "flex", alignItems: "center" }}>
                <span>{business.category}</span>
                <span>{business.price}</span>
                <span className="icon-circle-container"><i className="fas fa-circle"></i></span>
            </div>
            <div>
                <span style={{ color: "#008055", fontWeight: "600" }}>{nowHr >= openHr && nowHr < closeHr ? "Open" : "Closed"}</span>
                <span>until {nowHr >= openHr && nowHr < closeHr ? `${closeHrEst}` : `${openHrEst}`}</span>
            </div>
        </div>
    );
}

export default BusinessIndexItem;