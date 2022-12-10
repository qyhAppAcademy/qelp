import "./Item.css";
import { EST_OFFSET, convertToEst, IsOpen } from "../../../store/time.js";

const Item = ({ idx, business }) => {
    const open = new Date(business.open);
    const close = new Date(business.close);
    const now = new Date(Date().toLocaleString("en-US"));

    let openHr = open.getUTCHours();
    let closeHr = close.getUTCHours() > openHr ? close.getUTCHours() : close.getUTCHours() + 24;
    let nowHr = now.getUTCHours();

    let openHrEst = convertToEst(openHr - EST_OFFSET);
    let closeHrEst = convertToEst(closeHr - EST_OFFSET);

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
            {IsOpen(business) ? (
            <div>
                <span style={{ color: "#008055", fontWeight: "600" }}>Open</span>
                <span>until {closeHrEst}</span>
            </div>
            ) : (
            <div>
                <span style={{ color: "#FF8B87", fontWeight: "600" }}>Closed</span>
                <span>until {openHrEst}</span>
            </div>
            )}
        </div>
    );
}

export default Item;