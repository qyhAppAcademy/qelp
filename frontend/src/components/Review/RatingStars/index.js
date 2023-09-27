import { useState } from "react";

const COLORS = [
    "#c9c9c9",
    "#ffcc4b",
    "#ffad48",
    "#ff8742",
    "#ff643d",
    "#fb503b"
];

export const CONTENTS = [
    "Select your rating",
    "Not good",
    "Could've been better",
    "OK",
    "Good",
    "Great"
];

export const RatingStars = ({ review, component }) => {
    const ratingStars = new Array(5);

    for (let i = 1; i < COLORS.length; i++) {
        const idx = parseInt(review.rating) >= i ? parseInt(review.rating) : 0;

        ratingStars[i - 1] = (
            <span
                className="rating-star"
                style={{ color: COLORS[idx] }}
                key={`${component}-${review.id}-rs-${i}`}
            >
                <i className="fas fa-star"></i>
            </span>
        );
    }

    return <>{ratingStars}</>;
};

export const StarRatingNew = ({ rating, setRating }) => {
    const [hover, setHover] = useState({
        star: 0,
        content: "Select your rating"
    });

    const stars = STARS.map((star) => {
        return (
            <button
                key={star}
                style={hover.star > 0 ?
                    (star <= hover.star ? { color: COLORS[hover.star - 1] } : { color: "lightgray" }) :
                    (star <= rating.star ? { color: COLORS[rating.star - 1] } : { color: "lightgray" })
                }
                onClick={(e) => {
                    e.preventDefault();
                    setRating({
                        star: star,
                        content: CONTENTS[star - 1]
                    });
                }}
                onMouseEnter={() => {
                    setHover({
                        star: star,
                        content: CONTENTS[star - 1]
                    });
                }}
                onMouseLeave={() => {
                    setHover({
                        star: 0,
                        content: "Select your rating"
                    });
                }}
            >
                <i className="fas fa-star"></i>
            </button>
        );
    });

    return (
        <div className='review-star-container'>
            <div className="review-star-rating">
                {stars}
            </div>
            <span className="review-star-rating-content">{hover.star > 0 ? hover.content : rating.content}</span>
        </div>
    );
};