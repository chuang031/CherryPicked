import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { Link, useHistory, useParams } from 'react-router-dom';
import { getProductReview } from '../../../store/review';
import { deleteAReview } from '../../../store/review';
import { getSingleProduct } from '../../../store/product';
const ProductReviewslist = ({product})=>{

    const allProducts = useSelector((state)=> Object.values(state.product))

    console.log(allProducts, 'all products')
    const currentUser = useSelector((state)=>state.session.user)
    const allProductReviews = useSelector((state)=> Object.values(state.review))
console.log(allProductReviews, 'review')


    const dispatch = useDispatch()
    const history = useHistory()


const specificReviews = allProductReviews.filter((review)=> review.productId === product.id)


    useEffect(()=>{
        // setReviews(specificReviews)
        // if(spot !== undefined){
        dispatch(getProductReview(product.id))
        // .then(res=>setReviews(res.spotReviews))
    },[product.id, dispatch])

    const deleteReview = async (e, id)=>{
        e.preventDefault()
        dispatch(deleteAReview(id))
        dispatch(getSingleProduct(product.id))

        history.push(`/products/${product.id}`)
      
    }


 
    return(
        <div className='review-container'>


    {specificReviews?.map(({review,stars, productId, customerId, id})=>(
        
    <span className='review-list' key={review}>
    <div className='userid-rev'> Customer ID: {customerId} </div> 
   
   <div className='review-rev'> Review: {review}</div> 
   <div className='star-rev'>Stars:{stars}</div> 
   <div className='spotid-rev'> Product Number:{ productId}</div> 
   <div className='id-rev'>ID Number:{id}</div>



        <button className='delete-review' type="button" onClick={ (e)=> deleteReview(e, id)}>Delete Review</button>

</span>


))}


</div>
    )
 
}

export default ProductReviewslist