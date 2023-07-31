import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Switch } from "react-router-dom";
import SignupFormPage from "./components/SignupFormPage";
import LoginFormPage from "./components/LoginFormPage";
import LandingPage from "./components/LandingPage";
import AppHomePage from './components/AppHomePage';
import { authenticate } from "./store/session";
import Navigation from "./components/Navigation";
import ServerList from "./components/ServerList";

function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    dispatch(authenticate()).then(() => setIsLoaded(true));
  }, [dispatch]);

  return (
    <>
      {isLoaded && (
        <Switch>
          <Route exact path="/">
            <Navigation isLoaded={isLoaded} />
            <LandingPage />
          </Route>
          <Route path='/app'>
            <AppHomePage />
          </Route>
          <Route path="/login">
            <LoginFormPage />
          </Route>
          <Route path="/signup">
            <SignupFormPage />
          </Route>
          <Route path="/devtest">
            <ServerList />
          </Route>
        </Switch>
      )}
    </>
  );
}

export default App;
