import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Switch } from "react-router-dom";

import { authenticate } from "./store/session";
import SignupFormPage from "./components/Login-SignUp/SignupFormPage";
import LoginFormPage from "./components/Login-SignUp/LoginFormPage";
import Navigation from "./components/Login-SignUp/Navigation";
import ProductHomePage from "./components/Products/ProductHomePage/ProductHomePage";
import CreateProductForm from "./components/Products/CreateProductForm/CreateProductForm";
import ProtectedRoute from "./components/auth/ProtectedRoute";
import ProductDetailPage from "./components/Products/ProductDetailPage/ProductDetailPage";
import EditProductForm from "./components/Products/EditProductForm/EditProductForm";
import EditReviewForm from "./components/Reviews/EditReviewForm/EditReviewForm";
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
                    <Route path="/login">
                        <LoginFormPage />
                    </Route>

                    <Route path="/signup">
                        <SignupFormPage />
                    </Route>

                    <ProtectedRoute exact path="/">
                        <ProductHomePage />
                    </ProtectedRoute>

                    <ProtectedRoute exact path="/productform">
                        <CreateProductForm />
                    </ProtectedRoute>

                    <ProtectedRoute exact path="/products/:productId">
                    <ProductDetailPage />
                </ProtectedRoute>

                <ProtectedRoute exact path="/products/:productId/update">
                <EditProductForm />
            </ProtectedRoute>

            <ProtectedRoute exact path="/products/:productId/reviews/:reviewId/update">
            <EditReviewForm />
        </ProtectedRoute>

                </Switch>
            )}
        </>
    );
}

export default App;
