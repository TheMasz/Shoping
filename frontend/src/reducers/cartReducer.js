import {
  CART_ADD_ITEM,
  CART_CLEAR,
  CART_REMOVE_ITEM,
  CART_UPDATE_ITEM,
} from "../constants/cartConstant";

export const cartReducer = (state = { cartItems: [] }, action) => {
  switch (action.type) {
    case CART_ADD_ITEM: {
      const item = action.payload;
      const existItem = state.cartItems.find((x) => x._id === item._id);
      console.log("Adding item:", item);
      console.log("Existing item found:", existItem);
      if (existItem) {
        return {
          ...state,
          cartItems: state.cartItems.map((x) =>
            x._id === existItem._id ? item : x
          ),
        };
      } else {
        return {
          ...state,
          cartItems: [...state.cartItems, item],
        };
      }
    }

    case CART_REMOVE_ITEM: {
      return {
        ...state,
        cartItems: state.cartItems.filter(
          (item) => item._id !== action.payload.productId
        ),
      };
    }

    case CART_CLEAR: {
      return { ...state, cartItems: [] };
    }

    case CART_UPDATE_ITEM: {
      return {
        ...state,
        cartItems: action.payload,
      };
    }

    default:
      return state;
  }
};
