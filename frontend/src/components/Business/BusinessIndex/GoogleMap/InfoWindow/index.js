import "./index.css";
import { useHistory } from "react-router-dom";
import RatingStars from "../../../RatingStars";
import Categories from "../../../Categories";

const InfoWindow = ({ infoWindowRef, business }) => {
    const history = useHistory();

    const toBusinessShow = () => {
        history.push(`/businesses/${business.id}`);
    };

    return (
        <div ref={infoWindowRef} id="info-window">
            {business &&
                <>
                    <div onClick={toBusinessShow}>
                        <img
                            className="thumbnail"
                            src={business.photoUrls[0].url}
                            alt={`${business.name} thumbnail`}
                        />
                    </div>
                    <div onClick={toBusinessShow}>
                        <h1 className="name">{business.name}</h1>
                    </div>
                    <div>
                        <RatingStars
                            business={business}
                            component={"info-window"}
                        />
                        <span className="avg-rating" onClick={toBusinessShow}>
                            {business.avgRating.toFixed(1)}
                        </span>
                        <span className="reviews-count" onClick={toBusinessShow}>
                            ({business.reviewsCount} reviews)
                        </span>
                    </div>
                    <div>
                        <Categories
                            business={business}
                            component={"info-window"}
                            separator={<>, </>}
                        />
                    </div>
                </>
            }
        </div>
    );
};

export default InfoWindow;