import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import { editAProduct } from "../../../store/product";

function EditProductForm(){
const dispatch= useDispatch()
const {productId} = useParams()

const allProducts = useSelector((state)=> state.product)
const specificProduct = allProducts[productId]


const [title, setTitle] = useState(specificProduct.title);
const [imageUrl, setImageUrl] = useState(specificProduct.imageUrl);
const [url, setUrl] = useState(specificProduct.url);
const [detail, setDetail] = useState(specificProduct.detail);
const [price, setPrice] = useState(specificProduct.price);
const [errors, setErrors] = useState([]);

const history = useHistory();

const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors([]);
    const payload = { title, detail, price, url, imageUrl };

    let data = await dispatch(editAProduct(productId, payload));

    if (data.errors) {
        setErrors([...Object.values(data.errors)]);
    } else {
        history.push(`/products/${specificProduct.id}`);
    }
};

return (
    <section className="create-product-form">
        <form className="create-form" onSubmit={handleSubmit}>
            <h1 className="create">Create your Product!</h1>
            <ul>
                {errors.map((error, idx) => (
                    <li className="edit-errors" key={idx}>
                        {error}
                    </li>
                ))}
            </ul>

            <label>
                Title
                <input
                    type="text"
                    className="product-input"
                    value={title}
                    required
                    onChange={(e) => setTitle(e.target.value)}
                />
            </label>

            <label>
                Product Details
                <input
                    type="text"
                    className="product-input"
                    value={detail}
                    required
                    onChange={(e) => setDetail(e.target.value)}
                />
            </label>

            <label>
                Price
                <input
                    type="integer"
                    className="product-input"
                    value={price}
                    required
                    onChange={(e) => setPrice(e.target.value)}
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

            <label>
                Link
                <input
                    type="text"
                    className="pin-input"
                    value={url}
                    required
                    onChange={(e) => setUrl(e.target.value)}
                />
            </label>
            <button className="create-button" type="submit">
                Edit Your Product!
            </button>
        </form>
    </section>
);
}
export default EditProductForm