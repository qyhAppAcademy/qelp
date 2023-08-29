import { NavLink, useHistory } from 'react-router-dom';
import { EST_OFFSET, toLocalTime, isOpen } from "../../../../store/time.js";
import { StarRatingShowInFloat } from '../../../Review/StarRating.js';

import "./index.css";

const Card = ({ idx, business }) => {
    const history = useHistory();

    const categories = business.category.split(",").map((category, idx) => (
        <span key={idx} className="category">{category.trim()}</span>
    ));

    return (
        // <NavLink 
        //     exact to={`/businesses/${business.id}`}
        //     className="business-nav-link"
        // >
        // </NavLink>
        <div
            className="card"
            onClick={(e) => {
                e.preventDefault();
                history.push(`/businesses/${business.id}`);
            }}
        >
            <div className="thumbnail">
                <img src={business.photoUrls[0].url} />
            </div>
            <div className="name">
                {`${idx + 1}. ${business.name}`}
            </div>
            <div className="avg-rating">
                <StarRatingShowInFloat
                    rating={business.avgRating === null ?
                        0 : business.avgRating}
                />
            </div>
            <div>
                <span className="price">{business.price}</span>
                <span className="dot"><i className="fas fa-circle"></i></span>
                {categories}
            </div>
            {isOpen(business) ? (
                <div>
                    <span className="hours open">Open</span>
                    <span style={{fontWeight: "300"}}>until {toLocalTime(business.close, EST_OFFSET)}</span>
                </div>
            ) : (
                <div>
                    <span className="hours closed">Closed</span>
                    <span style={{ fontWeight: "300" }}>until {toLocalTime(business.open, EST_OFFSET)}</span>
                </div>
            )}
        </div>
    );
}


export const ItemOnGoogleMap = ({ business }) => {
    // const categories = business.category.split(",").map((c, idx) => (
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
                    {/* {categories} */}
                </div>
            </div>
        </NavLink>
    );
}

export default Card;