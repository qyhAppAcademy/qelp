import '../../fontawesome/css/all.min.css';
import { Helmet } from "react-helmet";

const STAR_COLORS = [
        "#FFCC4B",
        "#FFAD48",
        "#FF8742",
        "#FF643D",
        "#FB503B"
    ];

const STARS = [1, 2, 3, 4, 5];

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