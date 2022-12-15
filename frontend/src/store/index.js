import { createStore, combineReducers, compose, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import logger from 'redux-logger';
import session from './session';
import users from './users';
import businesses from "./businesses";
import reviews from "./reviews";

const rootReducer = combineReducers({
    session,
    users,
    businesses,
    reviews
});

let enhancer;

if (process.env.NODE_ENV === 'production') {
    enhancer = applyMiddleware(thunk);
} else {
    // const logger = require('redux-logger').default;
    const composeEnhancers =
        window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
    enhancer = composeEnhancers(applyMiddleware(thunk, logger));
}

const configureStore = (preloadedState) => (
    createStore(rootReducer, preloadedState, enhancer)
);

export default configureStore;