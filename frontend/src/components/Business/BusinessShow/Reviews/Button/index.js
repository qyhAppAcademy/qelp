import "./index.css";

const Button = ({ reviewed, setShowReviewForm }) => {

    return (
        <div className="business-review-buttons">
            <button className="submit-review-button" onClick={(e) => setShowReviewForm(true)}>
                <a href="#review-form-location">
                    <span style={{padding: "0 6px 0 0"}}><i className="fas fa-star"></i></span>
                    <span>{reviewed ? "Edit your" : "Write a"} review</span>
                </a>
            </button>
        </div>
    );
}

export default Button;