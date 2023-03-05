import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { getSingleProduct } from "../../../store/product";
import { addAReview } from "../../../store/review";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import './CreateReviewForm.css'
function CreateReviewForm({ product }) {
    const [review, setReview] = useState("");
    const [stars, setStars] = useState(0);
    const [imageUrl, setImageUrl] = useState("");
    const [isSelected, setIsSelected] = useState(false)
    const [hoverStars, setHoverStars] = useState(0)
    const dispatch = useDispatch();
    const [errors, setErrors] = useState([]);
    const history = useHistory();
    const allProducts = useSelector((state) => state.product);
    const specificProduct = allProducts[product.id];

    const allProductReviews = useSelector((state) => state.review);
    const [isShown, setIsShown] = useState(false);
    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrors([]);
        const payload = { review, stars, imageUrl };

        let data = await dispatch(addAReview(payload, product.id));
    
        dispatch(getSingleProduct(product.id));

        if (data.errors) {
            setErrors([...Object.values(data.errors)]);
        } else {
            history.push(`/products/${product.id}`);
        }

        setReview("");
        setStars(0);
        setImageUrl("");
    };

    const message = (num)=>{
        if (num === 1){
            return 'Cherry hates this'
        } else if (num === 2){
            return "Cherry thinks its alright"
        } else if (num === 3){
            return "Cherry says OK"
        } else if (num === 4){
            return "Cherry's good with it"
        } else if (num === 5){
            return "Cherry Picked!"
        } else {
            return null
        }
    }
    return (
        <section className="create-product-form">
            <form className="create-form" onSubmit={handleSubmit}>
                <h1 className="create">Create your Review!</h1>
                <ul>
                    {errors.map((error, idx) => (
                        <li className="edit-errors" key={idx}>
                            {error}
                        </li>
                    ))}
                </ul>

                <label style={{ display: "block" }}>Review</label>
                <textarea
                    type="text"
                    className="review-input"
                    value={review}
                    required
                    onChange={(e) => setReview(e.target.value)}
                />

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
                    <p > {message(hoverStars)}  </p>
                </div>

                <label>
                    Image Url
                    <input
                        type="text"
                        className="review-input"
                        value={imageUrl}
                        onChange={(e) => setImageUrl(e.target.value)}
                    />
                </label>

                <button className="create-button" type="submit">
                    Create Review!
                </button>
            </form>
        </section>
    );
}

export default CreateReviewForm;
