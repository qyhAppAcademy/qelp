import "./Reviews.css";

import ReviewButtons from "./ReviewButtons";
import ReviewForm from "../../../Review/Form";
import Review from "../../../Review";

import { useSelector } from "react-redux";
import { getCurrentUser } from "../../../../store/session";
import { useState } from "react";

const Reviews = ({ business }) => {
    const currentUser = useSelector(getCurrentUser);

    const review = currentUser ?
        Object.values(business.reviews)
            .find(review => review.user.id === currentUser.id) : undefined;

    const [showReviewForm, setShowReviewForm] = useState(false);

    const hasReviewed = review !== undefined;

    const reviews = Object.values(business.reviews).map((review) => (
        <div key={review.id} id={`review-${review.id}`}>
            <div className="review-header">
                <h1>{`${review.user.email.split("@")[0]}...`}</h1>
            </div>
            <Review key={review.id} review={review} />
        </div>
    ));

    return (
        <div className="business-reviews-container">
            {currentUser && (
                <ReviewButtons hasReviewed={hasReviewed} setShowReviewForm={setShowReviewForm} />
            )}
            <h1>Reviews</h1>
            {reviews}
            {/* <BusinessReviews business={business} /> */}
            {currentUser && (
                <ReviewForm businessId={business.id} review={review} showReviewForm={showReviewForm} setShowReviewForm={setShowReviewForm} />
            )}
        </div>
    );
};

export default Reviews;