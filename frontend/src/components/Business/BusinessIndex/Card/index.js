import { NavLink, useHistory } from 'react-router-dom';
import { StarRatingShowInFloat } from '../../../Review/StarRating.js';
import "./index.css";

const isBusinessOpen = (business) => {
    let open = new Date(business.open).getUTCHours();
    let closed = new Date(business.close).getUTCHours();
    let now = new Date(Date().toLocaleString("en-US")).getUTCHours();
    if (open >= closed) {
        closed += 24;
    }
    if (open > now) {
        now += 24;
    }
    return open <= now && now < closed;
}

const twelveHourFormat = (dateString) => {
    const date = new Date(dateString);
    const hour = date.getHours();
    const minute = date.getMinutes();
    const period = hour >= 0 && hour < 12 ? "AM" : "PM";
    return `${hour % 12 === 0 ? 12 : hour % 12}:${minute < 10 ?
        "0" + minute : minute} ${period}`;
}

const Card = ({ business, idx }) => {
    const history = useHistory();

    const categories = business.category.split(",").map((category, idx) => (
        <span key={idx} className="category">{category.trim()}</span>
    ));

    const open = isBusinessOpen(business);
    const hours = (
        <>
            <span className={`${open ? "open" : "closed"}`}>
                {open ? "Open" : "Closed"}
            </span>
            <span className='hours'>
                until {open ? twelveHourFormat(business.close) :
                    twelveHourFormat(business.open)}
            </span>
        </>
    );

    return (
        <div
            className="card"
            onClick={(e) => {
                e.preventDefault();
                history.push(`/businesses/${business.id}`);
            }}
        >
            <div>
                <img className="thumbnail" src={business.photoUrls[0].url} />
            </div>
            <div>
                <h1 className="name">{`${idx + 1}. ${business.name}`}</h1>
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
            <div>
                {hours}
            </div>
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