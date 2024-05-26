import {
  CART_ADD_ITEM,
  CART_CLEAR,
  CART_REMOVE_ITEM,
  CART_UPDATE_ITEM,
} from "../constants/cartConstant";
import axiosInstance from "../utils/axiosInstant";

export const addToCart = (productId, qty) => async (dispatch, getState) => {
  const { data } = await axiosInstance.get(`/api/products/${productId}`);
  dispatch({
    type: CART_ADD_ITEM,
    payload: {
      _id: data.product._id,
      name: data.product.name,
      category: data.product.category,
      price: data.product.price,
      countInStock: data.product.qty,
      qty,
    },
  });
  localStorage.setItem("cartItems", JSON.stringify(getState().cart.cartItems));
};

export const removeFromCart = (productId) => (dispatch, getState) => {
  dispatch({ type: CART_REMOVE_ITEM, payload: { productId } });
  localStorage.setItem("cartItems", JSON.stringify(getState().cart.cartItems));
};

export const clearCart = () => (dispatch) => {
  dispatch({ type: CART_CLEAR });
  localStorage.setItem("cartItems", []);
};

export const updateCart = (cartItems) => {
  return {
    type: CART_UPDATE_ITEM,
    payload: cartItems,
  };
};
