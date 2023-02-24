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
            <button
            className="create-button"
            onClick={navigateToCreateProductForm}
        >
            Create Product
        </button>
            <div className="products">
            {allProducts.map(({ id, imageUrl }, idx) => (
                <div key={id} className={idx % 3 === 1 ? 'small': idx % 3 === 2? 'medium': 'large'}>

                <Link to ={`/products/${id}`}>
                    <div className="img-container">
                        <img className="card_img" src={imageUrl}></img>
            </div>

                    </Link>
                </div>
            ))}
            </div>

   
        </div>
    );
};

export default ProductHomePage;
