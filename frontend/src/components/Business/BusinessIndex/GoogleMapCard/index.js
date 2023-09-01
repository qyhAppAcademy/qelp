import { NavLink } from 'react-router-dom';
import { StarRatingShowInFloat } from '../../../Review/StarRating.js';
import "./index.css"

const ItemOnGoogleMap = ({ business }) => {
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

export default ItemOnGoogleMap;