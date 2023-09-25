import { NavLink } from 'react-router-dom';
import { StarRatingShow } from "./StarRating.js";
import "./index.css";

export const ReviewAtHomePage = ({ review }) => {
    const createdAt = new Date(review.createdAt);
    const updatedAt = new Date(review.updatedAt);

    return (
        <div className='review-at-home-page'>
            <div className="review-email">
                <h1>{`${review.user.email.split("@")[0]}...`}</h1>
                <h2>{createdAt.getTime() < updatedAt.getTime() ? "Edited their " : "Wrote a "}review</h2>
            </div>
            <div className="review-business">
                <NavLink to={`/businesses/${review.business.id}`} className="continue-reading">{review.business.name}</NavLink>
            </div>
            <div className="review-rating">
                <StarRatingShow rating={review.rating} />
            </div>
            <div className="review-body">
                <p>{`${review.body.substring(0, 63)}...`}</p>
                <NavLink to={`/businesses/${review.business.id}#review-${review.id}`} className="continue-reading">Continue reading</NavLink>
            </div>
        </div>
    );
}

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
};

export default Review;