import React, { useEffect, useState } from "react";
import { NavLink, Redirect, useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { deleteAProduct, getSingleProduct } from "../../../store/product";
import CreateReviewForm from "../../Reviews/CreateReviewForm/CreateReviewForm";
import ProductReviews from "../../Reviews/ProductReviewsList/ProductReviewsList";
import ProductReviewslist from "../../Reviews/ProductReviewsList/ProductReviewsList";
import { getOneUserThunk } from "../../../store/user";

import './ProductDetailPage.css'

function ProductDetailPage(){
    const {productId} = useParams()
    // const allProducts = useSelector((state)=> state.product)
    // const specificProduct = allProducts[productId]
    const sessionUser = useSelector(state => state.session.user)
//    const productAuthor = useSelector(state=> state.user[specificProduct.brandId])
    const history = useHistory();
    const dispatch = useDispatch();
    useEffect(()=>{
        dispatch(getSingleProduct(productId))
    },[productId, dispatch])

    const { product, productAuthor } = useSelector((state) => {
        const product = state.product[productId];
        const productAuthor = state.user[product?.brandId];
       
    
        return {
            product,
            productAuthor,
    
        };
      });
  
    const deleteProduct = (e)=>{
        e.preventDefault()
        dispatch(deleteAProduct(productId))
        history.push(`/`)
    }


    useEffect(() => {
        if (product?.brandId && !productAuthor) {
          dispatch(getOneUserThunk(product.brandId));
        }
      }, [product, productAuthor]);




    if (!product) return null;
 
    return(
        <div>
        <h1> {productAuthor?.brandName }'s {product?.title}</h1>

        <div >
        <img className="product_image" src={product?.imageUrl}></img>
        </div>

        <div>Title: {product?.title}</div>
        <div>Product Details: {product?.detail}</div>
        <div>Price: ${(Math.round(product?.price * 100)/100)}</div>
        <div>Link: <a href={product?.url}>{product?.title} </a></div>
        <div>Brand: {productAuthor?.brandName }</div>

        {sessionUser.isBrand &&(
        <Link to={`/products/${product?.id}/update`}>
        <button className='update_button' type="button">Update Product Form</button>
      </Link>
      )}
   
      {sessionUser.isBrand &&(
      <button className='delete_button' type="button" onClick={deleteProduct}>
      Delete Product
    </button>
    )}
    
    
    <ProductReviewslist product={product} />
    
    {!sessionUser.isBrand &&(
    <CreateReviewForm product={product} />
    )
    }
        </div>
    )
}

export default ProductDetailPage