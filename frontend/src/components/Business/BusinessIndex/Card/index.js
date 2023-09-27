import "./index.css";
import { useHistory } from "react-router-dom";
import { RatingStarsFloat} from "../../../RatingStars";
import Categories from "../../Categories";
import Hours from "../../Hours";

const Card = ({ business, idx }) => {
    const history = useHistory();

    const toBusinessShow = () => {
        history.push(`/businesses/${business.id}`);
    };

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
            <div><RatingStarsFloat business={business} component={"card"} /></div>
            <div>
                <span className="price">{business.price}</span>
                <span className="dot"><i className="fas fa-circle"></i></span>
                <Categories
                    business={business}
                    component={"card"}
                    separator={<>&nbsp;</>}
                />
            </div>
            <div onClick={toBusinessShow}>
                <Hours business={business} component={"card"} />
            </div>
        </div>
    );
};

export default Card;