import { NavLink } from 'react-router-dom';
import { EST_OFFSET, toLocalTime, isOpen } from "../../../store/time.js";
import { StarRatingShowInFloat } from '../../Review/StarRating.js';
import "./Item.css";

const Item = ({ idx, business }) => {
    const categorySpans = business.category.split(",").map((c, idx) => (
        <span className="category" key={idx}>{c.trim()}</span>
    ));

    return (
        <NavLink exact to={`/businesses/${business.id}`} className="business-nav-link">
            <div className="business-index-item">
                <div className="business-index-item-picture">
                    <img alt="business-profile" src={business.photoUrls[0].url} />
                </div>
                <div className="business-index-item-name">
                    <h1 className='item-index'>{`${idx + 1}.`}</h1>
                    <h1 className='item-name'>{`${business.name}`}</h1>
                </div>
                <div className="business-index-avg-rating">
                    <StarRatingShowInFloat rating={business.avgRating === null ? 0 : business.avgRating} />
                </div>
                <div>
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
        </NavLink>
    );
}

export const ItemOnGoogleMap = ({ business }) => {
    // const categorySpans = business.category.split(",").map((c, idx) => (
    //     <span className="category" key={idx}>{c.trim()}</span>
    // ));

    return (
        <NavLink exact to={`/businesses/${business.id}`} className="google-map-item-nav-link">
            <div className="google-map-item">
                <div className="google-map-item-picture">
                    <img alt="google-map-item-profile" src={business.photoUrls[0].url} />
                </div>
                <div className="google-map-item-name">
                    <h1 className='item-name'>{`${business.name}`}</h1>
                </div>
                <div className="google-map-item-avg-rating">
                    <StarRatingShowInFloat rating={business.avgRating === null ? 0 : business.avgRating} />
                    <span style={{ padding: "0 0 0 9px", fontSize: "14px", textDecoration: "none" }}>{business.reviewsCount}</span>
                </div>
                <div className="google-map-item-category">
                    <p>{business.category}</p>
                    {/* {categorySpans} */}
                </div>
            </div>
        </NavLink>
    );
}

export default Item;