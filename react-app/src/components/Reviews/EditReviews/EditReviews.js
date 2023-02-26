import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import { editAProduct } from "../../../store/product";
import { editAReview } from "../../../store/review";

function EditReviewForm(){
const dispatch= useDispatch()
const {reviewId} = useParams()

const allReviews = useSelector((state)=> state.review)
const specificReview = allReviews[reviewId]


const [review, setReview] = useState(specificReview.review)
const [stars, setStars] = useState(specificReview.stars)
const [imageUrl, setImageUrl] = useState(specificReview.imageUrl)
const [errors, setErrors] = useState([]);

const history = useHistory();

const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors([]);
    const payload = { review, stars, imageUrl };

    let data = await dispatch(editAReview(reviewId, payload));

    if (data.errors) {
        setErrors([...Object.values(data.errors)]);
    } else {
        history.push(`/products/${specificReview.id}`);
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
            <label>
            Stars
            <input
                type="text"
                className="product-input"
                value={stars}
                required
                onChange={(e) => setStars(e.target.value)}
            />
        </label>

            <label>
                Image Url
                <input
                    type="text"
                    className="product-input"
                    value={imageUrl}
                    required
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