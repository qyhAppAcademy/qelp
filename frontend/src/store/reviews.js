import csrfFetch from "./csrf.js";

const RECEIVE_REVIEWS = 'reviews/receiveReviews';

export const fetchReviews = () => async (dispatch) => {
    const response = await csrfFetch(`/api/reviews`);
    const data = await response.json();
    dispatch(receiveReviews(data.reviews));
    return response;
};

export const getReviews = () => (state) => {
    return state.reviews ? Object.values(state.reviews) : [];
}

export const receiveReviews = (reviews) => {
    return {
        type: RECEIVE_REVIEWS,
        payload: reviews
    }
}

function reviewsReducer(state = {}, action) {
    Object.freeze(state);
    switch (action.type) {
        case RECEIVE_REVIEWS:
            return { ...action.payload };
        default:
            return state;
    }
}

export default reviewsReducer;