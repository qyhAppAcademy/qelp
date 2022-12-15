import '../../fontawesome/css/all.min.css';
import { useState } from "react";

const STAR_COLORS = [
        "#FFCC4B",
        "#FFAD48",
        "#FF8742",
        "#FF643D",
        "#FB503B"
    ];

const STARS = [1, 2, 3, 4, 5];

export const CONTENTS = [
        "Not good",
        "Could've been better",
        "OK",
        "Good",
        "Great"
    ];

export const StarRatingShow = ({ rating }) => {
    const stars = STARS.map((star) => {
            if (parseInt(rating) >= star) {
                return (
                    <span
                        key={star}
                        className="review-star"
                        style={{ color: STAR_COLORS[parseInt(rating) - 1] }}
                    >
                        <i className="fas fa-star"></i>
                    </span>
                );
            }
            else {
                return (
                    <span
                        key={star}
                        className="review-star"
                    >
                        <i className="fas fa-star"></i>
                    </span>
                );
            }
        });

    return (
        <div className="review-star-rating">
            {stars}
        </div>
    );
};

export const StarRatingShowInFloat = ({ rating }) => {
    const solidRating = Math.floor(rating);
    const filledRating = Math.ceil(rating);
    console.log((rating - solidRating).toFixed(2));
    const stars = STARS.map((star) => {
        if (solidRating >= star) {
            return (
                <span
                    key={star}
                    className="review-star"
                    style={{ 
                        color: STAR_COLORS[filledRating - 1] 
                    }}
                >
                    <i className="fas fa-star"></i>
                </span>
            );
        }
        else if (filledRating >= star){
            return (
                <span
                    key={star}
                    className="review-star"
                    style={{ 
                        color: STAR_COLORS[filledRating - 1],
                        opacity: (rating - solidRating).toFixed(2)
                        // opacity: 1
                    }}
                >
                    <i className="fas fa-star"></i>
                </span>
            );
        }
        else {
            return (
                <span
                    key={star}
                    className="review-star"
                    style={{
                        color: "white",
                        opacity: 0.3
                    }}
                >
                    <i className="fas fa-star"></i>
                </span>
            );
        }
    });

    return (
        <div className="review-star-rating">
            {stars}
        </div>
    );
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
                style={ hover.star > 0 ?
                    (star <= hover.star ? { color: STAR_COLORS[hover.star - 1] } : { color: "lightgray" }) :
                    (star <= rating.star ? { color: STAR_COLORS[rating.star - 1]} : {color: "lightgray"})
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