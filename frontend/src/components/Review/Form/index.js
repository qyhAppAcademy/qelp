import { useState } from "react";
import { useDispatch } from "react-redux";
import { FormErrors } from '../../Forms';
import { StarRatingNew, CONTENTS } from "../../Review/StarRating";
import { createReview, updateReview } from "../../../store/businesses";
import "./index.css";


const BODY_PLACEHOLDER = "Doesn’t look like much when you walk past, but I was practically dying of hunger so I popped in. The definition of a hole-in-the-wall. I got the regular hamburger and wow…  there are no words. A classic burger done right. Crisp bun, juicy patty, stuffed with all the essentials (ketchup, shredded lettuce, tomato, and pickles). There’s about a million options available between the menu board and wall full of specials, so it can get a little overwhelming, but you really can’t go wrong. Not much else to say besides go see for yourself! You won’t be disappointed.";

const ReviewForm = ({ businessId, review }) => {
    const [rating, setRating] = useState(review !== undefined ? {
        star: review.rating,
        content: CONTENTS[review.rating-1]
    } : {
        star: 0,
        content: "Select your rating"
    });

    const [body, setbody] = useState(review !== undefined ? review.body : '');

    const dispatch = useDispatch();

    const handleSubmit = (e) => {
        e.preventDefault();

        const reviewData = review === undefined ? 
            { rating: rating.star, body, businessId } :
            { id: review.id, rating: rating.star, body, businessId }

        if (review === undefined) {
            dispatch(createReview(reviewData));
        }
        else {
            dispatch(updateReview(reviewData));
        }
    }

    return (
        <>
            <div className="review-form">
                <form onSubmit={handleSubmit}>
                    {/* <FormErrors errors={errors} /> */}
                    <div className='textarea-container'>
                        <StarRatingNew rating={rating} setRating={setRating}/>
                        <textarea
                            placeholder={BODY_PLACEHOLDER}
                            value={body}
                            onChange={(e) => setbody(e.target.value)}
                            required
                        />
                    </div>

                    <div className="review-form-buttons">
                        <button type="submit" className="submit">Post Review</button>
                        <button className="cancel">Cancel</button>
                    </div>
                </form>
            </div>
        </>
    );
}

export default ReviewForm;