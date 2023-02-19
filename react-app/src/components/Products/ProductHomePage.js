import React, { useEffect, useState, useRef } from "react";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
const ProductHomePage = ()=>{

    const history = useHistory()
   const navigateToCreateProductForm = async(e) =>{
    history.push('/productform')
   }


return(
    
    <div>
    
    <div>All Products</div>
    <button className="create-button" onClick={navigateToCreateProductForm}>
    Create Pin
  </button>

    </div>
)
}

export default ProductHomePage