import { useHistory } from 'react-router-dom';
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