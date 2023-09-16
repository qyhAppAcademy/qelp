import "./fontawesome/css/all.min.css";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Route, Switch } from "react-router-dom";

import SignupFormPage from "./components/SignupFormPage";

import LoginFormPage from "./components/LoginFormPage";

import Navigation from "./components/Navigation";

import Home from "./components/Home";

import BusinessIndex from "./components/Business/BusinessIndex";

import BusinessShowPage from "./components/Business/BusinessShow";

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
          <Navigation />
          {/* <Home /> */}
        </div>
      </Route>
      <Route exact path="/businesses">
        <Navigation />
        <BusinessIndex />
      </Route>
      <Route exact path="/businesses/:businessId">
        <Navigation />
        <BusinessShowPage />
      </Route>
    </Switch>
  );
};

export default App;