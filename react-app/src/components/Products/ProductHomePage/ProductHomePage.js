import React, { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useHistory } from "react-router-dom";
import { getAllProducts } from "../../../store/product";
import cherry from '../../../images/cherry.png'
import './ProductHomePage.css'

const ProductHomePage = () => {
    const history = useHistory();
    const dispatch = useDispatch();

    const allProducts = useSelector((state) => Object.values(state.product));
    useEffect(() => {
        dispatch(getAllProducts());
    }, [dispatch]);
    // const navigateToCreateProductForm = async (e) => {
    //     history.push("/productform");
    // };
    // console.log(allProducts, "all");

    return (
        <div className="product_container">
            <h1 className="cherrypicked">Cherry Picked <img className = 'logo' src={cherry}></img></h1> 

            <div className="products">
            {allProducts.map(({ id, imageUrl, title, price }, idx) => (
                <div key={id} className={'medium'}>

                <NavLink  className= 'link' to ={`/products/${id}`}>
                    <div className="img-container">
                        <img className="card_img" src={imageUrl}></img>
                       
                        <div className="title">{title} ${(Math.round(price * 100)/100)}</div>
            </div>
           
                    </NavLink>
                </div>
            ))}
            </div>

   
        </div>
    );
};

export default ProductHomePage;
