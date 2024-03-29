import "./index.css";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { RatingStarsFloat } from "../../../../RatingStars";
import Categories from "../../../Categories";
import Hours from "../../../Hours";

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
        <div className="panel">
            <div onClick={toBusinessShow}>
                <h1 className="name">{business.name}</h1>
            </div>
            <div>
                <RatingStarsFloat business={business} component={"panel"} />
                <span className="avg-rating" onClick={toBusinessShow}>
                    {business.avgRating.toFixed(1)}
                </span>
                (<span className="reviews-count" onClick={toBusinessShow}>
                    {arr.length} reviews
                </span>)
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
            <div onClick={toBusinessShow}>
                <Hours business={business} component={"panel"}/>
            </div>
        </div>
    );
}

export default Panel;