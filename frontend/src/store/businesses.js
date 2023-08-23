import csrfFetch from "./csrf.js";

const RECEIVE_BUSINESSES = 'businesses/receiveBusinesses';
const RECEIVE_BUSINESS = 'businesses/receiveBusiness';

export const fetchBusinesses = () => async (dispatch) => {
    const response = await csrfFetch(`/api/businesses`);
    const data = await response.json();
    dispatch(receiveBusinesses(data.businesses));
    return response;
};

export const fetchBusinessesByAddress = (address) => async (dispatch) => {
    let params = "";
    if (address.val !== null) {
        params += `val=${address.val}`;
    }
    if (address.lat !== null && address.lng !== null) {
        params += `&lat=${address.lat}&lng=${address.lng}`;
    }
    const response = await csrfFetch(`/api/businesses/address?${params}`);
    const data = await response.json();
    dispatch(receiveBusinesses(data.businesses));
    return response;
}

export const fetchBusiness = (businessId) => async (dispatch) => {
    const response = await csrfFetch(`/api/businesses/${businessId}`);
    const data = await response.json();
    dispatch(receiveBusiness(data.business));
    return response;
};

export const createReview = (review) => async dispatch => {
    const response = await csrfFetch("/api/reviews", {
        method: "POST",
        body: JSON.stringify(review)
    });
    const data = await response.json();
    dispatch(receiveBusiness(data.business));
    return response;
};

export const updateReview = (review) => async dispatch => {
    const response = await csrfFetch(`/api/reviews/${review.id}`, {
        method: "PATCH",
        body: JSON.stringify(review)
    });
    if (response.ok) {
        const data = await response.json();
        dispatch(receiveBusiness(data.business));
    }
};

export const deleteReview = (reviewId) => async dispatch => {
    const response = await csrfFetch(`/api/reviews/${reviewId}`, {
        method: "DELETE",
    });
    if (response.ok) {
        const data = await response.json();
        dispatch(receiveBusiness(data.business));
    }
};

export const getBusinesses = () => (state) => {
    return state.businesses ? Object.values(state.businesses) : [];
}

export const getBusiness = (businessId) => (state) => {
    return state.businesses ? state.businesses[businessId] : null;
}

export const receiveBusinesses = (businesses) => {
    return {
        type: RECEIVE_BUSINESSES,
        payload: businesses
    }
}

export const receiveBusiness = (business) => {
    return {
        type: RECEIVE_BUSINESS,
        payload: business
    }
}

function businessesReducer(state = {}, action) {
    Object.freeze(state);
    const nextState = { ...state };
    switch (action.type) {
        case RECEIVE_BUSINESSES:
            return { ...action.payload };
        case RECEIVE_BUSINESS:
            nextState[action.payload.id] = action.payload;
            return nextState;
        default:
            return state;
    }
}

export default businessesReducer;