# Welcome to Qelp!

![Logo](app/assets/readme/logo.png)

[Qelp](https://qelp.onrender.com), a Yelp clone, is an online review site on which customers share their experiences, helping others make informed decisions about businesses.
<br/>

# Technologies
#### Frontend: React/Redux
#### Backend: Ruby on Rails
#### Database: PostgreSQL
#### Third Party API: Google Maps JavsScript API
#### Image Hosting: Amazon S3
#### Design and Styling: HTML and CSS

# Key Features

### User Auth
- Users can signup to login or choose demo user mode to login
- Input credentials are validated
- Input errros are handled

<!-- ![UserAuth] -->

### Create, Read, Edit, and Delete Reviews
- Users can read all reviews with or without logging in
- Users must login to create, edit, or delete reviews
- Users can only edit and delete their own reviews
- Users' ratings on a business affect its overall rating

<!-- ![Reviews] -->

Created a star rating bar to let users input their ratings intuitively.
Kept track of user's mouse hovering state and mouse clicking state to enable better user experience
```js
export const StarRatingNew = ({ rating, setRating }) => {
    const [hover, setHover] = useState({
        star: 0,
        content: "Select your rating"
    });

    const stars = STARS.map((star) => {
        return (
            <button
                key={star}
                style={ hover.star > 0 ?
                    (star <= hover.star ? { color: STAR_COLORS[hover.star - 1] } : { color: "lightgray" }) :
                    (star <= rating.star ? { color: STAR_COLORS[rating.star - 1]} : {color: "lightgray"})
                }
                onClick={(e) => {
                    e.preventDefault();
                    setRating({
                        star: star,
                        content: CONTENTS[star - 1]
                    });
                }}
                onMouseEnter={() => {
                    setHover({ 
                        star: star, 
                        content: CONTENTS[star - 1] 
                    });
                }}
                onMouseLeave={() => {
                    setHover({
                        star: 0,
                        content: "Select your rating"
                    });
                }}
            >
                <i className="fas fa-star"></i>
            </button>
        );
    });

    return (
        <div className='review-star-container'>
            <div className="review-star-rating">
                {stars}
            </div>
            <span className="review-star-rating-content">{hover.star > 0 ? hover.content : rating.content}</span>
        </div>
    );
};
 ```  

### Business Index, Search Bar, and Google Map
- Users can search for businesses based on their name or category
- Shows businesses that match the search query in a list, and display their locations on Google Map

<!-- ![BusinessIndex] -->

Created 2 types of filtering functions to find businesses matching the search query

One handles the search by name
```js
export const searchByName = (string, query) => {
    const words = string.split(" ");
    return words.some(word => {
        return word.toLowerCase().startsWith(query.toLowerCase());
    });
}
 ```

The other handles the search by category
 ```js
export const searchByCategory = (string, query, separator) => {
    const tags = string.split(separator);
    for (let i = 0; i < tags.length; i++) {
        tags[i] = tags[i].trim().toLowerCase();
    }

    const queryWords = query.split(separator);
    for (let i = 0; i < queryWords.length; i++) {
        queryWords[i] = queryWords[i].trim().toLowerCase();
    }

    return queryWords.every(queryWord => {
        return tags.some(tag => {
            const words = tag.split(" ");
            return words.some(word => word.startsWith(queryWord));
        })
    });
}
 ```

# Bonus Features
- Let users upload photos in their reviews
- Add a user page that displays a user's reviews
- Let users edit and delete their reviews in their user page
- Add Google's place autocomplete API to let users search by location