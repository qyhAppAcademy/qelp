import "./index.css";

const ratingInStars = (business) => {
    const COLORS = [
        "#C8C9CA",
        "#FFCC4B",
        "#FFAD48",
        "#FF8742",
        "#FF643D",
        "#FB503B"
    ];
    const floor = Math.floor(business.avgRating);
    const stars = [];
    for (let i = 1; i < COLORS.length; i++) {
        let idx, opacity;
        if (i <= floor) {
            idx = floor;
            opacity = 1;
        }
        else if (i === floor + 1) {
            idx = floor + 1;
            opacity = (business.avgRating - floor).toFixed(2);
        }
        else {
            idx = 0;
            opacity = 0.2;
        }
        stars.push(
            <span
                className="rating-star"
                style={{
                    color: COLORS[idx],
                    opacity: opacity
                }}
            >
                <i className="fas fa-star"></i>
            </span>
        );
    }
    return stars;
}

const InfoWindow = ({ business }) => {
    const categories = business.category.split(",").map((category, idx) => (
        <span className="category" key={idx}>{category.trim()}</span>
    ));

    const stars = ratingInStars(business);

    return (
        <div className="info-window">
            <div>
                <img
                    className="thumbnail"
                    src={business.photoUrls[0].url}
                    alt={`${business.name} thumbnail`}
                />
            </div>
            <div>
                <h1 className="name">{business.name}</h1>
            </div>
            <div>
                <div className="rating-stars">
                    {stars}
                </div>
                <span className="avg-rating">
                    {business.avgRating.toFixed(1)}
                </span>
                <span className="reviews-count">
                    {business.reviewsCount} reviews
                </span>
            </div>
            <div>
                {categories}
            </div>
        </div>
    );
}

export default InfoWindow;