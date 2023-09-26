import "./index.css";
import { RatingStars } from "./RatingStars";
import { NavLink } from "react-router-dom";

export const ReviewAtHomePage = ({ review }) => {
    const createdAt = new Date(review.createdAt);
    const updatedAt = new Date(review.updatedAt);

    return (
        <div className="review-at-home-page">
            <div className="review-email">
                <h1>{`${review.user.email.split("@")[0]}...`}</h1>
                <h2>{createdAt.getTime() < updatedAt.getTime() ? "Edited their " : "Wrote a "}review</h2>
            </div>
            <div className="review-business">
                <NavLink to={`/businesses/${review.business.id}`} className="continue-reading">{review.business.name}</NavLink>
            </div>
            <div className="review-rating">
                <RatingStars rating={review.rating} />
            </div>
            <div className="review-body">
                <p>{`${review.body.substring(0, 63)}...`}</p>
                <NavLink to={`/businesses/${review.business.id}#review-${review.id}`} className="continue-reading">Continue reading</NavLink>
            </div>
        </div>
    );
};

export const Review = ({ review }) => {
    const date = new Date(review.updatedAt).toLocaleDateString("en-US");

    const paragraphs = review.body.split("\n").map((paragraph, idx) => (
        <p key={idx}>{paragraph}</p>
    ));
    
    return (
        <div id={`review-${review.id}`} className="review">
            <div><h1>{`${review.user.email.split("@")[0]}...`}</h1></div>
            <div>
                <RatingStars review={review} component={"review"} />
                <span className="date">{date}</span>
            </div>
            <div>{paragraphs}</div>
        </div>
    );
};