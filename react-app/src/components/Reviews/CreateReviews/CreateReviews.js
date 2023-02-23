import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { addAReview } from "../../../store/review";

function CreateReviewForm(){
const [review, setReview] = useState('')
const [stars, setStars] = useState('')
const [imageUrl, setImageUrl] = useState('')

const dispatch = useDispatch()
const [errors, setErrors] = useState([]);
const history = useHistory()

const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors([]);
    const payload = { review, stars, imageUrl };

    let data = await dispatch(addAReview(payload));

    if (data.errors) {
        setErrors([...Object.values(data.errors)]);
    } else {
        history.push("/");
    }
};
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

            <label style={{display: 'block'}}>
                Review
                </label>
                <textarea
                    type="text"
                    className="review-input"
                    value={review}
                    required
                    onChange={(e) => setReview(e.target.value)}
                />
        

            <label>
                Stars
                 </label>
                <input
                    type="integer"
                    className="review-input"
                    value={stars}
                    required
                    onChange={(e) => setStars(e.target.value)}
                />
           

            <label>
                Image Url
                <input
                    type="text"
                    className="review-input"
                    value={imageUrl}
                    required
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

export default CreateReviewForm