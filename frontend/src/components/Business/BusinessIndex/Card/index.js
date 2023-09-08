import { useHistory } from "react-router-dom";
import "./index.css";

const ratingInStars = (business) => {
    const COLORS = [
        "#C8C9CA",
        "#FFCC4B",
        "#FFAD48",
        "#FF8742",
        "#FF643D",
        "#FB503B"
    ];
    const floor = Math.floor(business.avgRating);
    const stars = [];
    for (let i = 1; i < COLORS.length; i++) {
        let idx, opacity;
        if (i <= floor) {
            idx = floor;
            opacity = 1;
        }
        else if (i === floor + 1) {
            idx = floor + 1;
            opacity = (business.avgRating - floor).toFixed(2);
        }
        else {
            idx = 0;
            opacity = 0.2;
        }
        stars.push(
            <span
                className="rating-star"
                style={{
                    color: COLORS[idx],
                    opacity: opacity
                }}
            >
                <i className="fas fa-star"></i>
            </span>
        );
    }
    return stars;
}

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

    const avgRatingInStars = ratingInStars(business);

    const categories = business.category.split(",").map((category, idx) => (
        <span key={idx} className="category">{category.trim()}</span>
    ));

    const open = isBusinessOpen(business);
    const hours = (
        <>
            <span className={`${open ? "open" : "closed"}`}>
                {open ? "Open" : "Closed"}
            </span>
            <span className="hours">
                until {open ? twelveHourFormat(business.close) :
                    twelveHourFormat(business.open)}
            </span>
        </>
    );

    return (
        <div
            key={idx - 1}
            className="card"
            onClick={(e) => {
                e.preventDefault();
                history.push(`/businesses/${business.id}`);
            }}
        >
            <div>
                <img 
                    className="thumbnail" 
                    src={business.photoUrls[0].url}
                    alt={`${business.name} thumbnail`}
                />
            </div>
            <div>
                <h1 className="name">{`${idx + 1}. ${business.name}`}</h1>
            </div>
            <div>
                {avgRatingInStars}
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

export default Card;