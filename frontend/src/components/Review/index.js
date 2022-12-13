import { StarRatingShow } from "./StarRating.js"
import "./index.css";

const Review = ({ review }) => {
    const reviewDate = new Date(review.updatedAt);

    const paragraphs = review.body.split("\n").map((paragraph, index) => (
        <p key={index}>{paragraph}</p>
    ));
    
    return (
        <div className="review-container">
            <div className="review-rating-container">
                <StarRatingShow rating={review.rating} />
                <span className="review-date">{reviewDate.toLocaleDateString('en-US')}</span>
            </div>
            <div className="review-body">
                {paragraphs}
            </div>
        </div>
    );
}

export default Review;