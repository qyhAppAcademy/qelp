import React, { useState } from "react";
import { Route, Switch } from "react-router-dom";
import SignupFormPage from "./components/SignupFormPage";
import LoginFormPage from "./components/LoginFormPage";
import Navigation from "./components/Navigation";
import BusinessIndexPage from "./components/Business/BusinessIndex";
import BusinessShowPage from "./components/Business/BusinessShow";
import Home from "./components/Home";
import './fontawesome/css/all.min.css';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import useExternalScripts from "./hooks/useExternalScripts";

const GOOGLE_API_KEY = process.env.REACT_APP_GOOGLE_API_KEY;
const GOOGLE_API_SCRIPTS = {
  url: `https://maps.googleapis.com/maps/api/js?key=${GOOGLE_API_KEY}&callback=initMap&libraries=places&v=weekly`
};

const App = () => {
  useExternalScripts(GOOGLE_API_SCRIPTS);

  const [query, setQuery] = useState("");
  const [addressQuery, setAddressQuery] = useState("");

  return (
    <>
      <Switch>
        <Route path="/signup">
          <SignupFormPage />
        </Route>
        <Route path="/login">
          <LoginFormPage />
        </Route>
        <Route exact path="/">
          <div className="home-page">
            <Navigation setQuery={setQuery} setAddressQuery={setAddressQuery} />
            {/* <Home /> */}
          </div>
        </Route>
        <Route exact path="/businesses">
          <Navigation setQuery={setQuery} setAddressQuery={setAddressQuery} />
          <BusinessIndexPage query={query} addressQuery={addressQuery} />
        </Route>
        <Route exact path="/businesses/:businessId">
          <Navigation setQuery={setQuery} setAddressQuery={setAddressQuery} />
          <BusinessShowPage />
        </Route>
      </Switch>
    </>
  );
}

export default App;