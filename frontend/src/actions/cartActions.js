import { axios } from "axios";
import { CART_ADD_ITEM } from '../constants/cartConstants';

export const addToCart = (id, qty) => async (dispatch, getState) => {
    const {data} = await axios.get(`api/v1/product/${id}`)

    dispatch({
        type: CART_ADD_ITEM,
        payload: {
            productId: data.id,
            name: data.name,
            image: data.image,
            price: data.price,
            countInStock: data.count_in_stock,
            qty
        }
    })

    localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems));
}