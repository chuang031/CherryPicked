import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import { editAProduct } from "../../../store/product";
import { editAReview } from "../../../store/review";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
function EditReviewForm(){
const dispatch= useDispatch()
const {reviewId} = useParams()
const {productId} = useParams()
// const oneProduct = useSelector((state)=> state.product)



const currentUser = useSelector((state)=>state.session.user)
const allProductReviews = useSelector((state)=> state.review)
const specificReview = allProductReviews[reviewId]
console.log(specificReview.review, 'spec rev')

const [review, setReview] = useState(specificReview.review)
const [stars, setStars] = useState(specificReview.stars)
const [imageUrl, setImageUrl] = useState(specificReview.imageUrl)
const [errors, setErrors] = useState([]);
const [isShown, setIsShown] = useState(false);
const [hoverStars, setHoverStars] = useState(0)
const history = useHistory();

const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors([]);
    const payload = { review, stars, imageUrl };

    let data = await dispatch(editAReview(reviewId, payload));

    if (data.errors) {
        setErrors([...Object.values(data.errors)]);
    } else {
        history.push(`/products/${productId}`);
    }
};

return (
    <section className="create-product-form">
        <form className="create-form" onSubmit={handleSubmit}>
            <h1 className="create">Edit your Review!</h1>
            <ul>
                {errors.map((error, idx) => (
                    <li className="edit-errors" key={idx}>
                        {error}
                    </li>
                ))}
            </ul>

            <label>
                Review
                <input
                    type="text"
                    className="product-input"
                    value={review}
                    required
                    onChange={(e) => setReview(e.target.value)}
                />
            </label>


            <label>Stars</label>

            <div>
            {Array.from({ length: 5 }, (_, index) => {
                
                const value = index + 1;
                
                return (
                    <span
                    className='star'
                   
                    
                 onClick={() => setStars(value)}

                 onMouseEnter={()=> {
                    setHoverStars(value)
                    setIsShown(true)
                    
                }}
                onMouseLeave={()=>{ 
                    setHoverStars(stars)
                    setIsShown(false)
                }}

                    >
                    
                  
                        {isShown && (value <= hoverStars)? 
                            <FontAwesomeIcon icon={faStar } 
                            
                            color="#ffc107" 
                           
                            key={value}

                            />:
                            !isShown && (value  <= stars)?
                            <FontAwesomeIcon icon={faStar } 
                            
                            color="#ffc107" 
                           
                            key={value}
                            />
                            : <FontAwesomeIcon icon={faStar} 
                            color="#e4e5e9"
                           
                           
                            /> }

                            

                        

                    
                    </span>
                );
            })}
            <p>{hoverStars} out of 5 stars</p>
           
        </div>


            <label>
                Image Url
                <input
                    type="text"
                    className="product-input"
                    value={imageUrl}
                    onChange={(e) => setImageUrl(e.target.value)}
                />
            </label>

            <button className="create-button" type="submit">
                Edit Your Review!
            </button>
        </form>
    </section>
);
}
export default EditReviewForm