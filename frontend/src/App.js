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
  const [keywordQuery, setKeywordQuery] = useState("");
  const [addressQuery, setAddressQuery] = useState({
    val: "",
    geo: null
  });

  const Nav = <Navigation
    setKeywordQuery={setKeywordQuery}
    setAddressQuery={setAddressQuery}
  />;

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
          {Nav}
          {/* <Home /> */}
        </div>
      </Route>
      <Route exact path="/businesses">
        {Nav}
        <BusinessIndex
          keywordQuery={keywordQuery}
          addressQuery={addressQuery}
          setKeywordQuery={setKeywordQuery}
        />
      </Route>
      <Route exact path="/businesses/:businessId">
        {/* {Nav} */}
        <BusinessShowPage />
      </Route>
    </Switch>
  );
}

export default App;