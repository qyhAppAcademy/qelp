import "./index.css";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { CONTENTS } from "../../../Review/RatingStars";
import { StarRatingNew } from "../../../Review/StarRating";
import { createReview, updateReview, deleteReview } from "../../../../store/businesses";

const BODY_PLACEHOLDER = "Doesn’t look like much when you walk past, but I was practically dying of hunger so I popped in. The definition of a hole-in-the-wall. I got the regular hamburger and wow…  there are no words. A classic burger done right. Crisp bun, juicy patty, stuffed with all the essentials (ketchup, shredded lettuce, tomato, and pickles). There’s about a million options available between the menu board and wall full of specials, so it can get a little overwhelming, but you really can’t go wrong. Not much else to say besides go see for yourself! You won’t be disappointed.";

const Form = ({ businessId, review, showForm, setShowForm }) => {
    const reviewed = review !== undefined;

    const [rating, setRating] = useState(reviewed ? {
        star: review.rating,
        content: CONTENTS[review.rating-1]
    } : {
        star: 0,
        content: "Select your rating"
    });

    const [body, setBody] = useState(reviewed ? review.body : "");

    const [errors, setErrors] = useState([]);

    const dispatch = useDispatch();

    const handleSubmit = (e) => {
        e.preventDefault();

        const data = reviewed ?
            { id: review.id, rating: rating.star, body, businessId } :
            { rating: rating.star, body, businessId }

        const submit = reviewed ? updateReview : createReview;

        dispatch(submit(data)).then(() => {
            setErrors([]);
            setShowForm(false);
        }).catch(async res => {
            const error = await res.text();
            setErrors(JSON.parse(error).errors.map(error => {
                return error.split(" ").slice(1).join(" ");
            }));
        });
    };

    return (<>
        {showForm &&
        <div id="review-form">
            <h1>{reviewed ? "Edit your" : "Write a"} review</h1>
            <form onSubmit={handleSubmit}>
                <div className="textarea-container">
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

                        setShowForm(false);

                        setRating(review !== undefined ? {
                            star: review.rating,
                            content: CONTENTS[review.rating - 1]
                        } : {
                            star: 0,
                            content: "Select your rating"
                        });
                        
                        setBody(review !== undefined ? review.body : "");
                    }}>Cancel</button>
                    {review !== undefined ? 
                    (<button className="delete" onClick={e => {
                        e.preventDefault();
                        
                        dispatch(deleteReview(review.id));

                        setErrors([]);

                        setShowForm(false);

                        setRating({
                            star: 0,
                            content: "Select your rating"
                        });

                        setBody("");
                    }}><i className="fas fa-trash"></i></button>) : <></>}
                </div>
            </form>
        </div>
        }</>
    );
};

export default Form;