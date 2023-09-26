import "./index.css";
import { useSelector } from "react-redux";
import { getCurrentUser } from "../../../../store/session";
import { useState } from "react";
import { Review } from "../../../Review";
import ReviewForm from "../../../Review/Form";

const Reviews = ({ business }) => {
    const user = useSelector(getCurrentUser);

    const reviews = Object.values(business.reviews).map((review, idx) => (
        <Review review={review} key={idx} />
    ));

    const review = user ? Object.values(business.reviews)
        .find(review => review.user.id === user.id) : null;

    const reviewed = review !== null;

    const [showReviewForm, setShowReviewForm] = useState(false);

    return (
        <div className="business-show-reviews">
            {user &&
                <div className="reviews-button-container">
                    <button onClick={() => setShowReviewForm(true)}>
                        <a href="#review-form-location">
                            <span><i className="fas fa-star"></i></span>
                            <span>
                                {reviewed ? "Edit your" : "Write a"} review
                            </span>
                        </a>
                    </button>
                </div>
            }
            <h1>Reviews</h1>
            {reviews}
            {user && 
                <ReviewForm
                    businessId={business.id}
                    review={review}
                    showReviewForm={showReviewForm}
                    setShowReviewForm={setShowReviewForm}
                />
            }
        </div>
    );
};

export default Reviews;