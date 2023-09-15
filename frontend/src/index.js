import "./index.css";
import configureStore from "./store";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { QueryProvider } from "./context/Query";
import App from "./App";
import { createRoot } from "react-dom/client";
import GoogleMapsAPIScript from "./GoogleMapsAPIScript";
import React from "react";
import * as session from "./store/session";
import csrfFetch from "./store/csrf";

const store = configureStore();

const Root = () => {
  return (
    <BrowserRouter>
      <Provider store={store}>
        <QueryProvider>
          <App />
        </QueryProvider>
      </Provider>
    </BrowserRouter>
  );
}

const renderApplication = () => {
  const root = createRoot(document.getElementById('root'));
  root.render((
    <>
      <GoogleMapsAPIScript />
      <React.StrictMode>
        <Root />
      </React.StrictMode>
    </>
  ));
}

if (!sessionStorage.getItem("currentUser") ||
    !sessionStorage.getItem("X-CSRF-Token")) {
  store.dispatch(session.restoreSession()).then(renderApplication);
} else {
  renderApplication();
}

if (process.env.NODE_ENV !== "production") {
  window.store = store;
  window.session = session;
  window.csrfFetch = csrfFetch;
}

// import { LoadScript } from "@react-google-maps/api";
// <LoadScript
//   googleMapsApiKey={process.env.REACT_APP_GOOGLE_API_KEY}
//   libraries={libraries}
// >
// </LoadScript>