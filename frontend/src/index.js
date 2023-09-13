import React from "react";

import configureStore from "./store";
import csrfFetch from "./store/csrf";
import * as sessionActions from "./store/session";

import './reset.css';
import "./index.css";

import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { KeywordProvider } from "./context/Keyword";
import App from "./App";

import ReactDOM from "react-dom";
import { Helmet } from "react-helmet";

const store = configureStore();

if (process.env.NODE_ENV !== "production") {
  window.store = store;
  window.csrfFetch = csrfFetch;
  window.sessionActions = sessionActions;
}

function Root() {
  return (
    <BrowserRouter>
      <Provider store={store}>
        <KeywordProvider>
          <App />
        </KeywordProvider>
      </Provider>
    </BrowserRouter>
  );
}

const GOOGLE_API_KEY = process.env.REACT_APP_GOOGLE_API_KEY;
const GOOGLE_API_URL =
  `https://maps.googleapis.com/maps/api/js?key=${GOOGLE_API_KEY}&callback=initMap&libraries=places&v=weekly`;

const renderApplication = () => {
  ReactDOM.render((
    <>
      <Helmet>
        <script src={GOOGLE_API_URL} async defer></script>
      </Helmet>
      <React.StrictMode>
        <Root />
        {/* import { LoadScript } from "@react-google-maps/api";
        <LoadScript googleMapsApiKey={process.env.REACT_APP_GOOGLE_API_KEY} libraries={libraries}>
        </LoadScript> */}
      </React.StrictMode>
    </>
  ), document.getElementById('root'));
}

window.initMap = async () => {
};

if (
  sessionStorage.getItem("currentUser") === null ||
  sessionStorage.getItem("X-CSRF-Token") === null
) {
  store.dispatch(sessionActions.restoreSession()).then(renderApplication);
} else {
  renderApplication();
}