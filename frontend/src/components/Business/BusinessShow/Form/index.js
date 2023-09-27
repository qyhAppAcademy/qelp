import "./index.css";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { createReview, updateReview, deleteReview } from "../../../../store/businesses";
import { CONTENTS } from "../../../RatingStars";
import Inputs from "./Inputs";
import Buttons from "./Buttons";

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
            <form id="review-form" onSubmit={(e) => handle(e, "submit")}>
                <h1>{reviewed ? "Edit your" : "Write a"} review</h1>
                <Inputs
                    rating={rating} setRating={setRating}
                    body={body} setBody={setBody}
                    errors={errors}
                />
                <Buttons handle={handle} reviewed={reviewed} />
            </form>
        }
    </>;
};

export default Form;