import React, { useState } from "react";
import { Route, Switch } from "react-router-dom";

import SignupFormPage from "./components/SignupFormPage";
import LoginFormPage from "./components/LoginFormPage";

import Navigation from "./components/Navigation";
import BusinessIndex from "./components/Business/BusinessIndex";
import BusinessShowPage from "./components/Business/BusinessShow";
import Home from "./components/Home";

import './fontawesome/css/all.min.css';
import "react-responsive-carousel/lib/styles/carousel.min.css";

const App = () => {
  return (
    <Switch>
      <Route path="/signup">
        <SignupFormPage />
      </Route>
      <Route path="/login">
        <LoginFormPage />
      </Route>
      <Route exact path="/">
        <div className="home-page">
          <Navigation />;
          {/* <Home /> */}
        </div>
      </Route>
      <Route exact path="/businesses">
        <Navigation />;
        <BusinessIndex />
      </Route>
      <Route exact path="/businesses/:businessId">
        <Navigation />;
        <BusinessShowPage />
      </Route>
    </Switch>
  );
}

export default App;