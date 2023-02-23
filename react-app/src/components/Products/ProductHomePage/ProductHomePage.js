import React, { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { getAllProducts } from "../../../store/product";
import { Link } from "react-router-dom";
import './ProductHomePage.css'

const ProductHomePage = () => {
    const history = useHistory();
    const dispatch = useDispatch();

    const allProducts = useSelector((state) => Object.values(state.product));
    useEffect(() => {
        dispatch(getAllProducts());
    }, [dispatch]);
    const navigateToCreateProductForm = async (e) => {
        history.push("/productform");
    };
    console.log(allProducts, "all");

    return (
        <div className="product_container">
            <h1>All Products</h1>
            <div className="products">
            {allProducts.map(({ id, title, detail, url, imageUrl, price }) => (
                <li key={id} className="card">

                <Link to ={`/products/${id}`}>
                    <div className="img-container">
                        <img className="card_img" src={imageUrl}></img>
                    </div>
                    <div className="title">Product Name: {title}</div>
                    <div className="detail">Product Details: {detail} </div>
                    <div className="price">${(Math.round(price * 100)/100)} </div>
                    <div className="link">Link: {url}</div>
                    </Link>
                </li>
            ))}
            </div>

            <button
                className="create-button"
                onClick={navigateToCreateProductForm}
            >
                Create Product
            </button>
        </div>
    );
};

export default ProductHomePage;
