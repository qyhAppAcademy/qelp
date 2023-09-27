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

export const RatingStarsFloat = ({ business, component }) => {
    const ratingStars = new Array(5);

    const floor = Math.floor(business.avgRating);

    for (let i = 1; i < COLORS.length; i++) {
        let idx, opacity;
        if (i <= floor) {
            idx = floor;
            opacity = 1;
        }
        else if (i === floor + 1 && business.avgRating > floor) {
            idx = floor + 1;
            opacity = (business.avgRating - floor).toFixed(2);
        }
        else {
            idx = 0;
            opacity = 0.2;
        }
        ratingStars[i - 1] = (
            <span
                className="rating-star"
                style={{
                    color: COLORS[idx],
                    opacity: opacity
                }}
                key={`${component}-${business.id}-rs-${i}`}
            >
                <i className="fas fa-star"></i>
            </span>
        );
    }
    
    return <>{ratingStars}</>;
};

export const RatingStarsInt = ({ review, component }) => {
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

export const SelectRatingStars = ({ rating, setRating }) => {
    const ratingStars = new Array(5);

    const [hover, setHover] = useState({
        stars: 0,
        content: CONTENTS[0]
    });

    for (let i = 1; i < COLORS.length; i++) {
        ratingStars[i - 1] = (
            <button
                style={hover.stars > 0 ?
                    (i <= hover.stars ?
                        { color: COLORS[hover.stars] } :
                        { color: COLORS[0] }) :
                    (i <= rating.stars ?
                        { color: COLORS[rating.stars] } :
                        { color: COLORS[0] })}
                onClick={(e) => {
                    e.preventDefault();
                    setRating({ stars: i, content: CONTENTS[i] });
                }}
                onMouseEnter={() => setHover({ stars: i, content: CONTENTS[i] })}
                onMouseLeave={() => setHover({ stars: 0, content: CONTENTS[0] })}
                key={i - 1}
            >
                <i className="fas fa-star"></i>
            </button>
        );
    }

    return (
        <div className="select-rating-stars">
            {ratingStars}
            <span
                className="content"
                style={hover.stars > 0 ?
                    { color: COLORS[hover.stars] } :
                    { color: rating.stars > 0 ?
                        COLORS[rating.stars] : "#6d6d6d" }}
            >
                {hover.stars > 0 ? hover.content : rating.content}
            </span>
        </div>
    );
};