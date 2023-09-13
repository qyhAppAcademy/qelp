const COLORS = [
    "#C8C9CA",
    "#FFCC4B",
    "#FFAD48",
    "#FF8742",
    "#FF643D",
    "#FB503B"
];

const RatingStars = ({ business, component }) => {
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
    
    return (<>{ratingStars}</>);
}

export default RatingStars;