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
import { loadOtherUsers } from "../../../store/user";
const ProductReviewslist = ({ product }) => {
    const allProducts = useSelector((state) => Object.values(state.product));
    const { productId } = useParams();
    const currentUser = useSelector((state) => state.session.user);
const allUsers = useSelector((state)=> Object.values(state.customer))


    const [isShown, setIsShown] = useState(false);

    const dispatch = useDispatch();
    const history = useHistory();

    const allProductReviews = useSelector((state) =>
        Object.values(state.review)
    );
    const specificReviews = allProductReviews.filter(
        (review) => review.productId === product.id
    );

    // const specificReviewCustomers = allUsers.map(
    //     (user) =>  
    // )
console.log(allUsers, 'revvv')
    

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

    // const showPicture =
    return (
        <div className="mx-auto max-w-screen-xl px-4 py-8 sm:px-6 lg:px-8">
            <h2 class="text-xl font-bold sm:text-2xl">Customer Reviews</h2>

            <div class="mt-4 flex items-center gap-4">
                <p class="text-3xl font-medium">
                    3.8
                    <span class="sr-only"> Average review score </span>
                </p>
                <p class="mt-0.5 text-xs text-gray-500">
                    Based on {specificReviews.length} reviews
                </p>
            </div>
            <div className=" mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {specificReviews?.map(
                ({ review, stars, customerId, imageUrl, id }) => (
                    <span className="review-list " key={review}>
         

                        <div>
                        {allUsers.map(user=> user.id === customerId ?
                            
                            <div><img className=' w-16 h-16 rounded-full border border-gray-100 shadow-sm ' src={!(user.imageUrl)? 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTg-5Ga9DOBo0Xl-QkZK8TmKUH0IOcLmn4t_wTNzOIgBQPET6MM1uk8BI7v69cQ1nBNwJs&usqp=CAU': user.imageUrl}></img> {user.firstName} {user.lastName}</div>
                            
                            :null)}
                            {Array.from({ length: 5 }, (_, index) => {
                                const value = index + 1;

                                return (
                                    <span className="stars">
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
                            <div className>{stars} out of 5 stars</div>
                        </div>

                        <div className="review-rev mt-2 font-medium sm:mt-0">
                            {" "}
                            Review: {review}
                        </div>
                    {imageUrl && (
                       
                    <div>
        
                        <div> Review Picture:</div>
                        <img className="rev-img " src={imageUrl}></img>
                    </div>)}

                        <footer class="mt-4">
                            <p class="text-xs text-gray-500">
                                Footer blah blah blah
                            </p>
                        </footer>

                        {currentUser.id === customerId && (
                            <button
                                className="delete-review text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 font-medium rounded-lg text-xs px-2 py-1.5 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
                                type="button1"
                                onClick={(e) => deleteReview(e, id)}
                            >
                                Delete My Review
                            </button>
                        )}

                        {currentUser.id === customerId && (
                            <button
                                className="edit-review text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 font-medium rounded-lg text-xs px-2 py-1.5 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700 m-5"
                                type="button1"
                                onClick={(e) => editReview(e, id)}
                            >
                                Edit My Review
                            </button>
                        )}
                    </span>
                )
            )}</div>
        </div>

    );
};

export default ProductReviewslist;
