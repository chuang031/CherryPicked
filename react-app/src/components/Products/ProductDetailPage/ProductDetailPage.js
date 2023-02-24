import React, { useEffect, useState } from "react";
import { NavLink, Redirect, useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { deleteAProduct, getSingleProduct } from "../../../store/product";
import CreateReviewForm from "../../Reviews/CreateReviews/CreateReviews";
import ProductReviews from "../../Reviews/ReviewsList/ReviewsList";
import ProductReviewslist from "../../Reviews/ReviewsList/ReviewsList";



function ProductDetailPage(){
    const {productId} = useParams()
    const allProducts = useSelector((state)=> state.product)
    const specificProduct = allProducts[productId]
    const [reviews,setReviews]= useState([])
    const history = useHistory();
    const dispatch = useDispatch();
    useEffect(()=>{
        dispatch(getSingleProduct(productId))
    },[productId, dispatch])

  
    const deleteProduct = (e)=>{
        e.preventDefault()
        dispatch(deleteAProduct(productId))
        history.push(`/`)
    }
    if (!specificProduct) return null;
 
    return(
        <div>
        <h1>Product Detail Page</h1>

        <div className="product_image">
        <img src={specificProduct?.imageUrl}></img>
        </div>

        <div>Title: {specificProduct?.title}</div>
        <div>Product Details: {specificProduct?.detail}</div>
        <div>Price: ${(Math.round(specificProduct?.price * 100)/100)}</div>
        <div>Link: {specificProduct?.url}</div>
        <div>Brand: {specificProduct?.brandId}</div>

        <Link to={`/products/${specificProduct?.id}/update`}>
        <button className='update_button' type="button">Update Product Form</button>
      </Link>

   

      <button className='delete_button' type="button" onClick={deleteProduct}>
      Delete Product
    </button>

    

    <ProductReviewslist product={specificProduct} reviews={reviews} setReviews={setReviews}/>
    <CreateReviewForm product={specificProduct} reviews={reviews} setReviews={setReviews}/>
        </div>
    )
}

export default ProductDetailPage