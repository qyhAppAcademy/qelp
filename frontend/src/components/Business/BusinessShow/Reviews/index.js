import "./index.css";
import { useSelector } from "react-redux";
import { getCurrentUser } from "../../../../store/session";
import { useState } from "react";
import Review from "../../../Review";

import ReviewButtons from "./Button";
import ReviewForm from "../../../Review/Form";
import Button from "./Button";

const Reviews = ({ business }) => {
    const user = useSelector(getCurrentUser);

    const reviews = Object.values(business.reviews).map((review, idx) => (
        <div id={`review-${review.id}`} key={idx}>
            <div className="review-header">
                <h1>{`${review.user.email.split("@")[0]}...`}</h1>
            </div>
            <Review review={review} />
        </div>
    ));

    const review = user ? Object.values(business.reviews)
        .find(review => review.user.id === user.id) : null;

    const [showReviewForm, setShowReviewForm] = useState(false);

    return (
        <div className="business-reviews-container">
            {user &&
                <Button
                    reviewed={review !== null}
                    setShowReviewForm={setShowReviewForm}
                />
            }
            {/* <h1>Reviews</h1>
            {reviews}
            {user && (
                <ReviewForm businessId={business.id} review={review} showReviewForm={showReviewForm} setShowReviewForm={setShowReviewForm} />
            )} */}
        </div>
    );
};

export default Reviews;