const LOAD_MANY_PRODUCTS = "products/LOAD_MANY_PRODUCTS"

const LOAD_ONE_PRODUCT = "products/LOAD_ONE_PRODUCT"

const DELETE_PRODUCT = "products/DELETE_PRODUCT"

const loadProducts = (products) =>{
    return{
        type: LOAD_MANY_PRODUCTS,
        products
    }
}

const loadOneProduct = (products) =>{
    return{
        type: LOAD_ONE_PRODUCT,
        products
    }
}

const deleteProduct = (productId) =>{
    return {
        type: DELETE_PRODUCT,
        productId
    }
}

export const getAllProducts = () => async (dispatch) =>{
    const response = await fetch(`/api/products/`)

    if (response.ok){
        const data = await response.json()
        dispatch(loadProducts(data))
    }
}

export const addAProduct = (products)=> async (dispatch) =>{
    const response = await fetch("/api/products/",{
    method: "POST",
    headers: {
        "Content-Type": "application/json"
    },
    body: JSON.stringify(products)
});

if (response.ok){
    const data = await response.json();
    dispatch(loadOneProduct(data));
    return data;
} else {
    const error = response.json();
    return error;
}
}

const initialProducts = {}
const productsReducer = (state=initialProducts, action) =>{
    let copy = {...state};
    switch (action.type){
        case LOAD_MANY_PRODUCTS:
            action.products.forEach((product=>{
                copy[product.id] = product
            }))
            return copy;

        case LOAD_ONE_PRODUCT:
            copy[action.products.id] = action.products
            return copy;

         default:
            return state;
    }

}

export default productsReducer