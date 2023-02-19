import React, { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { getAllProducts } from "../../store/product";
const ProductHomePage = ()=>{

    const history = useHistory()
const dispatch= useDispatch()

const allProducts = useSelector((state)=> Object.values(state.product))
    useEffect(()=>{
        dispatch(getAllProducts())
    },[dispatch])
   const navigateToCreateProductForm = async(e) =>{
    history.push('/productform')
   }
console.log(allProducts, 'all')

return(
    
    <div>
    
    <h1>All Products</h1>
    {allProducts.map(({id, title, detail, url, imageUrl, price })=>
    <li key={id} className='card'>


    <img className='card_img' src={imageUrl}></img>
    <div className='title'>Product Name: {title}</div> 
    <div className='detail'>Product Details: {detail} </div>
    <div className='price'>${price} </div>
    <div className="link">Link: {url}</div>
    
    </li>
    
    )}



    <button className="create-button" onClick={navigateToCreateProductForm}>
    Create Pin
  </button>

    </div>
)
}

export default ProductHomePage