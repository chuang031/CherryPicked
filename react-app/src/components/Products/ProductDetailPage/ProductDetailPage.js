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

    <section>
  <div class="mx-auto px-4 py-16 sm:px-6 lg:px-4">
    <div class="grid grid-cols-1 lg:h-screen lg:grid-cols-2 max-h-96 ">
      <div class="relative z-10 lg:py-16 ">
        <div class="relative h-64 sm:h-80 lg:h-full ">
          <img
            alt="Product"
            src={product?.imageUrl}
            class=" absolute inset-0 h-full w-full object-contain  "
          />
        </div>
      </div>

      <div class="relative flex items-center ">
        <span
          class=""
        ></span>

        <div class="p-8 sm:p-16 lg:p-24">
          <h2 class="text-2xl font-bold sm:text-3xl m-10 ">
          {productAuthor?.brandName }'s {product?.title}
          </h2>

   <div>Title: {product?.title}</div>
        <div>Product Details: {product?.detail}</div>
          <div>Price: ${(Math.round(product?.price * 100)/100)}</div>
       <div>Link: <a href={product?.url}>{product?.title} </a></div>
        <div>Brand: {productAuthor?.brandName }</div>
  

   {sessionUser.isBrand &&(
  <Link to={`/products/${product?.id}/update`}>
      <button  class="mt-8 inline-block rounded border border-rose-500 bg-rose-500 px-12 py-3 text-sm font-medium text-white hover:bg-transparent hover:text-rose-500 focus:outline-none focus:ring active:text-indigo-500" type="button">Update Product Form</button>
   </Link>
    )}
   
  {sessionUser.isBrand &&(
    <button  class="mt-8 inline-block rounded border border-rose-500 bg-rose-500 px-12 py-3 text-sm font-medium text-white hover:bg-transparent hover:text-rose-500 focus:outline-none focus:ring active:text-indigo-500" type="button" onClick={deleteProduct}>
    Delete Product
 </button>
 )}
        </div>
      </div>
    </div>
  </div>
</section>


    <ProductReviewslist product={product} />
    
    {!sessionUser.isBrand &&(
    <CreateReviewForm product={product} />
    )
    }
        </div>
    )
}

export default ProductDetailPage