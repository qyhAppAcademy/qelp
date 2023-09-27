import "./index.css";
import { SelectRatingStars } from "../../../../RatingStars";

const PLACEHOLDER = "Doesn’t look like much when you walk past, but I was practically dying of hunger so I popped in. The definition of a hole-in-the-wall. I got the regular hamburger and wow…  there are no words. A classic burger done right. Crisp bun, juicy patty, stuffed with all the essentials (ketchup, shredded lettuce, tomato, and pickles). There’s about a million options available between the menu board and wall full of specials, so it can get a little overwhelming, but you really can’t go wrong. Not much else to say besides go see for yourself! You won’t be disappointed.";

const Inputs = ({ rating, setRating, body, setBody, errors }) => {
    return (
        <div className="textarea-container">
            <SelectRatingStars
                rating={rating}
                setRating={setRating}
            />
            <textarea
                placeholder={PLACEHOLDER}
                value={body}
                onChange={(e) => setBody(e.target.value)}
            />
            {errors.length > 0 &&
                <div className="review-form-errors-container">
                    <h1>{errors[0]}</h1>
                </div>
            }
        </div>
    );
};

export default Inputs;