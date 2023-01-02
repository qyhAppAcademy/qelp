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
import { LoadScript } from "@react-google-maps/api";

const App = () => {
  const [query, setQuery] = useState("");
  const [addressQuery, setAddressQuery] = useState("");
  const places = ["places"];

  return (
    <>
      <LoadScript googleMapsApiKey="AIzaSyABsyD3KcHUYWKa84L5jeymTrQy0A72Rp8" libraries={places}>
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
              <Home />
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
      </LoadScript>
    </>
  );
}

export default App;
