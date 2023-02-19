import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Switch } from "react-router-dom";

import { authenticate } from "./store/session";
import SignupFormPage from './components/Login-SignUp/SignupFormPage';
import LoginFormPage from "./components/Login-SignUp/LoginFormPage";
import Navigation from './components/Login-SignUp/Navigation'
import ProductHomePage from "./components/Products/ProductHomePage";
import CreateProductForm from "./components/Products/CreateProductForm";
import ProtectedRoute from './components/auth/ProtectedRoute'

function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    dispatch(authenticate()).then(() => setIsLoaded(true));
  }, [dispatch]);

  return (
    <>
      <Navigation isLoaded={isLoaded} />
      {isLoaded && (
        <Switch>
          <Route path="/login" >
            <LoginFormPage />
          </Route>

          <Route path="/signup">
            <SignupFormPage />
          </Route>

          <Route exact path="/">
          <ProductHomePage />
        </Route>

        <ProtectedRoute exact path="/productform">
        <CreateProductForm />
      </ProtectedRoute>
        
        </Switch>
      )}
    </>
  );
}

export default App;
