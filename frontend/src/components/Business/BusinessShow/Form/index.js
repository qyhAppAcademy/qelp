import "./index.css";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { CONTENTS, SelectRatingStars } from "../../../Review/RatingStars";
// import { StarRatingNew } from "../../../Review/StarRating";
import { createReview, updateReview, deleteReview } from "../../../../store/businesses";
import Buttons from "./Buttons";

const PLACEHOLDER = "Doesn’t look like much when you walk past, but I was practically dying of hunger so I popped in. The definition of a hole-in-the-wall. I got the regular hamburger and wow…  there are no words. A classic burger done right. Crisp bun, juicy patty, stuffed with all the essentials (ketchup, shredded lettuce, tomato, and pickles). There’s about a million options available between the menu board and wall full of specials, so it can get a little overwhelming, but you really can’t go wrong. Not much else to say besides go see for yourself! You won’t be disappointed.";

const Form = ({ businessId, review, showForm, setShowForm }) => {
    const reviewed = review !== undefined;

    const [rating, setRating] = useState({
        stars: reviewed ? review.rating : 0,
        content: CONTENTS[reviewed ? review.rating : 0]
    });

    const [body, setBody] = useState(reviewed ? review.body : "");

    const [errors, setErrors] = useState([]);

    const dispatch = useDispatch();

    const hideForm = () => {
        setErrors([]);
        setShowForm(false);
    };

    const handle = (e, action) => {
        e.preventDefault();

        switch (action) {
            case "submit":
                const data = reviewed ?
                    { id: review.id, rating: rating.stars, body, businessId } :
                    { rating: rating.stars, body, businessId };

                const submit = reviewed ? updateReview : createReview;

                dispatch(submit(data)).then(hideForm).catch(async res => {
                    const error = await res.text();
                    setErrors(JSON.parse(error).errors.map(error => {
                        return error.split(" ").slice(1).join(" ");
                    }));
                });

                return;
            case "cancel":
                setRating({
                    stars: reviewed ? review.rating : 0,
                    content: CONTENTS[reviewed ? review.rating : 0]
                });
                setBody(reviewed ? review.body : "");
                break;
            case "delete":
                dispatch(deleteReview(review.id));

                setRating({
                    stars: 0,
                    content: CONTENTS[0]
                });
                setBody("");
                break;
            default:
                break;
        }
        hideForm();
    };

    return <>
        {showForm &&
            <div id="review-form">
                <h1>{reviewed ? "Edit your" : "Write a"} review</h1>
                <form onSubmit={(e) => handle(e, "submit")}>
                    <div className="textarea-container">
                        <SelectRatingStars
                            rating={rating}
                            setRating={setRating}
                        />
                        {/* <textarea
                            placeholder={PLACEHOLDER}
                            value={body}
                            onChange={(e) => setBody(e.target.value)}
                        />
                        {errors.length > 0 &&
                            <div className="review-form-errors-container">
                                <h1>{errors[0]}</h1>
                            </div>
                        } */}
                    </div>

                    <Buttons handle={handle} reviewed={reviewed} />

                    {/* <div className="review-form-buttons">
                        <button type="submit" className="submit">
                            Post Review
                        </button>
                        <button
                            className="cancel"
                            onClick={(e) => handle(e, "cancel")}
                        >
                            Cancel
                        </button>
                        {reviewed &&
                            <button
                                className="delete"
                                onClick={(e) => handle(e, "delete")}
                            >
                                <i className="fas fa-trash"></i>
                            </button>
                        }
                    </div> */}
                </form>
            </div>
        }
    </>;
};

export default Form;