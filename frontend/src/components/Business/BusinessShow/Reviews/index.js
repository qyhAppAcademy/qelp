import "./index.css";
import { Review } from "../../../Review";

const Reviews = ({ business }) => {
    const reviews = Object.values(business.reviews).map((review, idx) => (
        <Review review={review} key={idx} />
    ));

    return (
        <div className="reviews">
            <h1>Reviews</h1>
            {reviews}
        </div>
    );
};

export default Reviews;