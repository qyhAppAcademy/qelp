import "./index.css";
import { useHistory } from "react-router-dom";
import RatingStars from "../../RatingStars";
import Categories from "../../Categories";

const isBusinessOpen = (business) => {
    let open = new Date(business.open).getUTCHours();
    let closed = new Date(business.close).getUTCHours();
    let now = new Date(Date().toLocaleString("en-US")).getUTCHours();
    if (open >= closed)
        closed += 24;
    if (open > now)
        now += 24;
    return open <= now && now < closed;
};

const twelveHourFormat = (dateString) => {
    const date = new Date(dateString);
    const hour = date.getHours();
    const minute = date.getMinutes();
    const period = hour >= 0 && hour < 12 ? "AM" : "PM";
    return `${hour % 12 === 0 ? 12 : hour % 12}:${minute < 10 ?
        "0" + minute : minute} ${period}`;
};

const Card = ({ business, idx }) => {
    const history = useHistory();

    const toBusinessShow = () => {
        history.push(`/businesses/${business.id}`);
    };

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
        <div className="card">
            <div onClick={toBusinessShow}>
                <img
                    className="thumbnail"
                    src={business.photoUrls[0].url}
                    alt={`${business.name} thumbnail`}
                />
            </div>
            <div onClick={toBusinessShow}>
                <h1 className="name">{`${idx + 1}. ${business.name}`}</h1>
            </div>
            <div><RatingStars business={business} component={"card"} /></div>
            <div>
                <span className="price">{business.price}</span>
                <span className="dot"><i className="fas fa-circle"></i></span>
                <Categories
                    business={business}
                    component={"card"}
                    separator={<>&nbsp;</>}
                />
            </div>
            <div onClick={toBusinessShow}>{hours}</div>
        </div>
    );
};

export default Card;