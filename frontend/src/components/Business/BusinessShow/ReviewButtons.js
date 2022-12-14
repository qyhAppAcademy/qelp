import "./ReviewButtons.css";

const ReviewButtons = ({ hasReviewed }) => {

    return (
        <div className="business-review-buttons">
            <button className="submit-review-button">
                <span style={{padding: "0 6px 0 0"}}><i className="fas fa-star"></i></span>
                <span>{hasReviewed ? "Edit your" : "Write a"} review</span>
            </button>
        </div>
    );
}

export default ReviewButtons;