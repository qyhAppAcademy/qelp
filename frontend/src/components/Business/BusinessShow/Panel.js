import "./Panel.css";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import RatingStars from "../RatingStars";
import Categories from "../Categories";
import Hours from "../Hours";

const Panel = ({ business }) => {

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

    business.avgRating = avg;

    const history = useHistory();

    const toBusinessShow = () => {
        history.push(`/businesses/${business.id}`);
    };

    return (
        <>
            <div onClick={toBusinessShow}>
                <h1 className="name">{business.name}</h1>
            </div>
            <div>
                <RatingStars business={business} component={"panel"} />
                <span className="avg-rating" onClick={toBusinessShow}>
                    {business.avgRating.toFixed(1)}
                </span>
                <span className="reviews-count" onClick={toBusinessShow}>
                    ({business.reviewsCount} reviews)
                </span>
            </div>
            <div>
                <span className="price">{business.price}</span>
                <span className="dot"><i className="fas fa-circle"></i></span>
                <Categories
                    business={business}
                    component={"panel"}
                    separator={<>, </>}
                />
            </div>
            <div onClick={toBusinessShow}><Hours business={business} /></div>
            {/* <div>
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
            )} */}
        </>
    );
}

export default Panel;