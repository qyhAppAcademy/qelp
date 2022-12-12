import "./Item.css";
import { EST_OFFSET, toLocalTime, isOpen } from "../../../store/time.js";

const Item = ({ idx, business }) => {
    const categorySpans = business.category.split(",").map((c, idx) => (
        <span className="category" key={idx}>{c.trim()}</span>
    ));

    return (
        <div className="business-index-item">
            <div className="business-index-item-picture">
                {/* <img src={`https://qelp-dev.s3.amazonaws.com/seeds/businesses/${business.id}/1.jpeg`} alt="" /> */}
                <img src={business.photoUrl} />
            </div>
            <div>
                <h1>{`${idx + 1}. ${business.name}`}</h1>
            </div>
            <div>
                {/* <span>{business.category}</span> */}
                {categorySpans}
                <span style={{ color: "#727272" }}>{business.price}</span>
                <span className="icon-circle-container" style={{ color: "#727272" }}><i className="fas fa-circle"></i></span>
            </div>
            {isOpen(business) ? (
            <div>
                <span className="business-open">Open</span>
                <span style={{fontWeight: "300"}}>until {toLocalTime(business.close, EST_OFFSET)}</span>
            </div>
            ) : (
            <div>
                <span className="business-closed">Closed</span>
                <span style={{ fontWeight: "300" }}>until {toLocalTime(business.open, EST_OFFSET)}</span>
            </div>
            )}
        </div>
    );
}

export default Item;