import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { Link, useHistory, useParams } from "react-router-dom";
import { getProductReview } from "../../../store/review";
import { deleteAReview } from "../../../store/review";
import { getSingleProduct } from "../../../store/product";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./ProductReviewsList.css";
import { getOneUserThunk } from "../../../store/user";
import {loadOtherUsers} from "../../../store/user";
const ProductReviewslist = ({ product }) => {
    const allProducts = useSelector((state) => Object.values(state.product));
    const {productId} = useParams()
    const currentUser = useSelector((state) => state.session.user);

    const [isShown, setIsShown] = useState(false);

    const dispatch = useDispatch();
    const history = useHistory();

    const allProductReviews = useSelector((state) =>
    Object.values(state.review)
);
    const specificReviews = allProductReviews.filter(
        (review) => review.productId === product.id
    );

// const specificReviewCustomers = allProductReviews.filter(
//     (review)=> review.customerId 
// )

    
 
 
    useEffect(() => {
        // setReviews(specificReviews)
        // if(spot !== undefined){
        dispatch(getProductReview(product.id));
     
        // .then(res=>setReviews(res.spotReviews))
    }, [product.id, dispatch]);

    const deleteReview = async (e, id) => {
        e.preventDefault();
        dispatch(deleteAReview(id));
        dispatch(getSingleProduct(product.id));

        history.push(`/products/${product.id}`);
    };

    const editReview = async (e, id) => {
        e.preventDefault();
        history.push(`/products/${product.id}/reviews/${id}/update`);
    };

    return (
        <div className="review-container">
            {specificReviews?.map(
                ({ review, stars, customerId, imageUrl, id }) => (

                    
                    <span className="review-list" key={review}>
                        <div className="userid-rev">
                            
                            Customer ID: {customerId}
                        </div>
                        <div className="review-rev"> Review ID: {id}</div>
                        <div className="review-rev"> Review: {review}</div>
                        <div>
                            {Array.from({ length: 5 }, (_, index) => {
                                const value = index + 1;

                                return (
                                    <span className="star">
                                        {isShown && value <= stars ? (
                                            <FontAwesomeIcon
                                                icon={faStar}
                                                color="#ffc107"
                                                key={value}
                                            />
                                        ) : !isShown && value <= stars ? (
                                            <FontAwesomeIcon
                                                icon={faStar}
                                                color="#ffc107"
                                                key={value}
                                            />
                                        ) : (
                                            <FontAwesomeIcon
                                                icon={faStar}
                                                color="#e4e5e9"
                                            />
                                        )}
                                    </span>
                                );
                            })}
                            <div>{stars} out of 5 stars</div>
                          
                        </div>
                         
                            <div>
                        <div> Review Picture:</div>
                        <img className="rev-img" src={imageUrl}></img>
                        </div>
                        

                            {currentUser.id === customerId &&(
                        <button
                            className="delete-review"
                            type="button"
                            onClick={(e) => deleteReview(e, id)}
                        >
                            Delete Review
                        </button>

                        )}

                    {currentUser.id === customerId &&(
                        <button
                            className="edit-review"
                            type="button"
                            onClick={(e) => editReview(e, id)}
                        >
                            Edit Review
                        </button>

                        )}
                    </span>
                )
            )}
        </div>
    );
};

export default ProductReviewslist;
