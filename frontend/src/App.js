import React from "react";
import { Route, Switch } from "react-router-dom";
import SignupFormPage from "./components/SignupFormPage"; 
import LoginFormPage from "./components/LoginFormPage";
import Navigation from "./components/Navigation";
import BusinessShowPage from "./components/Business/BusinessShow/index.js";
import BusinessIndexPage from "./components/Business/BusinessIndexPage";

const App = () => {
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
          <Navigation />
        </Route>
        <Route exact path="/businesses">
          <BusinessIndexPage />
        </Route>
        <Route exact path="/businesses/:businessId">
          <BusinessShowPage />
        </Route>
      </Switch>
    </>
  );
}

export default App;
