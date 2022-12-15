import "./Panel.css";
import { EST_OFFSET, toLocalTime, isOpen } from "../../../store/time.js";
import { StarRatingShow, StarRatingShowInFloat } from "../../Review/StarRating";

const Panel = ({ business, setQuery }) => {

    const categoryItems = business.category.split(",").map((c, i)=> {
        return (
            <span key={i} className="hoverable-categories">{c.trim()}</span>
        );
    });

    let sum = 0;
    const arr = Object.values(business.reviews);
    for(let i = 0; i < arr.length; i++){
        sum += parseInt(arr[i].rating);
    }
    const avg = sum * 1.0 / arr.length;

    return (
        <>
            <div className="business-panel-item">
                <h1>{business.name}</h1>
            </div>
            <div className="business-panel-item">
                {/* <h2>Ratings {avg.toFixed(2)}</h2> */}
                <StarRatingShowInFloat rating={avg} />
                <span className="review-count">{arr.length} reviews</span>
            </div>
            <div className="business-panel-item">
                <span>{business.price}</span>
                <span className="icon-circle-container"><i className="fas fa-circle"></i></span>
                <span>{categoryItems}</span>
            </div>
            {isOpen(business) ? (
            <div className="business-panel-item">
                <span className="business-open">Open</span>
                <span style={{ fontWeight: "300" }}>until {toLocalTime(business.close, EST_OFFSET)}</span>
            </div>
            ) : (
            <div className="business-panel-item">
                <span className="business-closed">Closed</span>
                <span style={{ fontWeight: "300" }}>until {toLocalTime(business.open, EST_OFFSET)}</span>
            </div>
            )}
        </>
    );
}

export default Panel;