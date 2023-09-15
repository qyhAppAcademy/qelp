import "./index.css";
import configureStore from "./store";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { GoogleMapsAPIProvider,
         GoogleMapsAPIScript } from "./context/GoogleMapsAPI";
import { QueryProvider } from "./context/Query";
import App from "./App";
import { createRoot } from "react-dom/client";
import React from "react";
import * as session from "./store/session";
import csrfFetch from "./store/csrf";

const store = configureStore();

const Root = () => {
  return (
    <BrowserRouter>
      <Provider store={store}>
        <GoogleMapsAPIProvider>
          <QueryProvider>
            <App />
          </QueryProvider>
        </GoogleMapsAPIProvider>
      </Provider>
    </BrowserRouter>
  );
};

const renderApp = () => {
  const root = createRoot(document.getElementById('root'));
  root.render((
    <>
      <GoogleMapsAPIScript />
      <React.StrictMode>
        <Root />
      </React.StrictMode>
    </>
  ));
};

if (!sessionStorage.getItem("currentUser") ||
    !sessionStorage.getItem("X-CSRF-Token")) {
  store.dispatch(session.restoreSession()).then(renderApp);
} else {
  renderApp();
};

if (process.env.NODE_ENV !== "production") {
  window.store = store;
  window.session = session;
  window.csrfFetch = csrfFetch;
};

// import { LoadScript } from "@react-google-maps/api";
// <LoadScript
//   googleMapsApiKey={process.env.REACT_APP_GOOGLE_API_KEY}
//   libraries={libraries}
// >
// </LoadScript>