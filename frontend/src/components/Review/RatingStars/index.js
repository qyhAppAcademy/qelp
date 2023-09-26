const COLORS = [
    "#c9c9c9",
    "#ffcc4b",
    "#ffad48",
    "#ff8742",
    "#ff643d",
    "#fb503b"
];

export const CONTENTS = [
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