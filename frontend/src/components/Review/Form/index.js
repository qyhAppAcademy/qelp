import { useState } from "react";
import { useDispatch } from "react-redux";
import { StarRatingNew, CONTENTS } from "../../Review/StarRating";
import { createReview, updateReview, deleteReview } from "../../../store/businesses";
import "./index.css";


const BODY_PLACEHOLDER = "Doesn’t look like much when you walk past, but I was practically dying of hunger so I popped in. The definition of a hole-in-the-wall. I got the regular hamburger and wow…  there are no words. A classic burger done right. Crisp bun, juicy patty, stuffed with all the essentials (ketchup, shredded lettuce, tomato, and pickles). There’s about a million options available between the menu board and wall full of specials, so it can get a little overwhelming, but you really can’t go wrong. Not much else to say besides go see for yourself! You won’t be disappointed.";

const ReviewForm = ({ businessId, review, showReviewForm, setShowReviewForm }) => {
    const [rating, setRating] = useState(review !== undefined ? {
        star: review.rating,
        content: CONTENTS[review.rating-1]
    } : {
        star: 0,
        content: "Select your rating"
    });

    const [body, setBody] = useState(review !== undefined ? review.body : '');

    const [errors, setErrors] = useState([]);

    const dispatch = useDispatch();

    const handleSubmit = (e) => {
        e.preventDefault();

        const reviewData = review === undefined ? 
            { rating: rating.star, body, businessId } :
            { id: review.id, rating: rating.star, body, businessId }
        
        const submitFunc = review === undefined ? createReview : updateReview;
        
        
        dispatch(submitFunc(reviewData)).then(res => {
            console.log("hello world");
            setErrors([]);
            setShowReviewForm(false);
        }).catch(async res => {
            const data = await res.text();
            setErrors(JSON.parse(data).errors.map(error => {
                return error.split(" ").slice(1).join(" ");
            }));
        });
    }

    return (
        <>
            {showReviewForm && (
            <>
            <div id="review-form-location" style={{padding: "20px 0", fontSize: "24px", fontWeight: "700"}}>
                <h1>{review === undefined ? "Write a" : "Edit your"} review</h1>
            </div>
            <div className="review-form">
                <form onSubmit={handleSubmit}>
                    <div className='textarea-container'>
                        <StarRatingNew rating={rating} setRating={setRating}/>
                        <textarea
                            placeholder={BODY_PLACEHOLDER}
                            value={body}
                            onChange={(e) => setBody(e.target.value)}
                        />
                        {errors.length > 0 &&
                        <div className="review-form-errors-container">
                            <h1>{errors[0]}</h1>
                        </div>
                        }
                    </div>

                    <div className="review-form-buttons">
                        <button type="submit" className="submit">Post Review</button>
                        <button className="cancel" onClick={e => {
                            setErrors([]);

                            setShowReviewForm(false);

                            setRating(review !== undefined ? {
                                star: review.rating,
                                content: CONTENTS[review.rating - 1]
                            } : {
                                star: 0,
                                content: "Select your rating"
                            });
                            
                            setBody(review !== undefined ? review.body : '');
                        }}>Cancel</button>
                        {review !== undefined && (
                        <button className="delete" onClick={e => {
                            dispatch(deleteReview(review.id));

                            setErrors([]);

                            setShowReviewForm(false);

                            setRating({
                                star: 0,
                                content: "Select your rating"
                            });

                            setBody('');
                        }}><i className="fas fa-trash"></i></button>
                        )}
                    </div>
                </form>
            </div>
            </>)}
        </>
    );
}

export default ReviewForm;