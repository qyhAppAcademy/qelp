import Review from "../../Review";
import "./Reviews.css";

const BusinessReviews = ({ business }) => {
    const reviews = Object.values(business.reviews).map((review, index) => (
        <>
            <div className="review-header">
                <h1>{`${review.user.email.split("@")[0]}...`}</h1>
            </div>
            <Review key={index} review={review} />
        </>
    ));

    return (
        <>
            <h1>Reviews</h1>
            {reviews}
        </>
    );
}

export default BusinessReviews;