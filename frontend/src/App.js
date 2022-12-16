import React, { useState } from "react";
import { Route, Switch } from "react-router-dom";
import SignupFormPage from "./components/SignupFormPage";
import LoginFormPage from "./components/LoginFormPage";
import Navigation from "./components/Navigation";
import BusinessIndexPage from "./components/Business/BusinessIndex";
import BusinessShowPage from "./components/Business/BusinessShow";
import Home from "./components/Home";
import { Helmet } from "react-helmet";
import './fontawesome/css/all.min.css';
import "react-responsive-carousel/lib/styles/carousel.min.css";

const App = () => {
  const [query, setQuery] = useState("");

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
            <Navigation setQuery={setQuery} />
            <Home />
          </div>
        </Route>
        <Route exact path="/businesses">
          <Navigation setQuery={setQuery} />
          <BusinessIndexPage query={query}/>
        </Route>
        <Route exact path="/businesses/:businessId">
          <Navigation setQuery={setQuery} />
          <BusinessShowPage />
        </Route>
      </Switch>
      {/* <Helmet>
        <script defer type="text/javascript" src='https://github.com/qyhAppAcademy/qelp/blob/main/frontend/src/fontawesome/js/all.min.js'></script>
      </Helmet> */}
    </>
  );
}

export default App;
