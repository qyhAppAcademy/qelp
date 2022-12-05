import React from "react";
import { Route, Switch } from "react-router-dom";
import SignupFormPage from "./components/SignupFormPage"; 
import LoginFormPage from "./components/LoginFormPage";
import Navigation from "./components/Navigation";

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
      </Switch>
    </>
  );
}

export default App;
