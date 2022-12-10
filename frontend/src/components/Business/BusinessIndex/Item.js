import "./Item.css";
import { EST_OFFSET, toLocalTime, isOpen } from "../../../store/time.js";

const Item = ({ idx, business }) => {
    return (
        <div className="business-index-item">
            <div className="business-index-item-picture">
                <img src={`https://qelp-dev.s3.amazonaws.com/seeds/businesses/${business.id}/1.jpeg`} alt="" />
            </div>
            <div>
                <h1>{`${idx + 1}. ${business.name}`}</h1>
            </div>
            <div>
                <span>{business.category}</span>
                <span>{business.price}</span>
                <span className="icon-circle-container"><i className="fas fa-circle"></i></span>
            </div>
            {isOpen(business) ? (
            <div>
                <span className="business-open">Open</span>
                <span>until {toLocalTime(business.close, EST_OFFSET)}</span>
            </div>
            ) : (
            <div>
                <span className="business-closed">Closed</span>
                <span>until {toLocalTime(business.open, EST_OFFSET)}</span>
            </div>
            )}
        </div>
    );
}

export default Item;