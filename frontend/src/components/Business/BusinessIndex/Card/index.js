import { useHistory } from 'react-router-dom';
import "./index.css";

const STAR_COLORS = [
    "#FFCC4B",
    "#FFAD48",
    "#FF8742",
    "#FF643D",
    "#FB503B"
];

const STARS = [1, 2, 3, 4, 5];

const StarRatingShowInFloat = ({ rating }) => {
    const solid   = Math.floor(rating);
    const filled  = Math.ceil(rating);
    const opacity = rating - solid;
    const stars = [];
    const star = (idx, rating, opacity) => {
        return (
            <span
                key={idx}
                className="review-star"
                style={{
                    padding: "0 2px 0 0",
                    color: STAR_COLORS[rating - 1],
                    opacity: `${opacity * 100}%`
                }}
            >
                <i style={{ fontSize: "18px" }} className="fas fa-star"></i>
            </span>
        );
    }
    
    for (let i = 0; i < solid; i++) {
        stars.push(star(i, solid, 1));
    }
    stars.push(star(filled - 1, filled, opacity));
    // const stars = STARS.map((star) => {
    //     if (solidRating >= star) {
    //         return (
    //             <span
    //                 key={star}
    //                 className="review-star"
    //                 style={{
    //                     color: STAR_COLORS[solidRating - 1],
    //                     padding: "0 2px 0 0"
    //                 }}
    //             >
    //                 <i style={{ fontSize: "18px" }} className="fas fa-star"></i>
    //             </span>
    //         );
    //     }
    //     else if (filledRating >= star) {
    //         return (
    //             <span
    //                 key={star}
    //                 className="review-star"
    //                 style={{
    //                     color: STAR_COLORS[solidRating - 1],
    //                     opacity: (rating - solidRating).toFixed(2),
    //                     padding: "0 2px 0 0"
    //                     // opacity: 1
    //                 }}
    //             >
    //                 <i style={{ fontSize: "18px" }} className="fas fa-star"></i>
    //             </span>
    //         );
    //     }
    //     else {
    //         return (
    //             <span
    //                 key={star}
    //                 className="review-star"
    //                 style={{
    //                     color: "#C8C9CA",
    //                     opacity: 0.3,
    //                     padding: "0 2px 0 0"
    //                 }}
    //             >
    //                 <i style={{ fontSize: "18px" }} className="fas fa-star"></i>
    //             </span>
    //         );
    //     }
    // });

    return (
        <div className="review-star-rating">
            {stars}
        </div>
    );
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
            <div>
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

export default Card;