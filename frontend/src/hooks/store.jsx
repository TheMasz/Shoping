import { createStore, compose, applyMiddleware, combineReducers } from "redux";
import { thunk } from "redux-thunk";
import {
  userSigninReducer,
  userSignupReducer,
  userUpdateReducer,
} from "../reducers/userReducer";
import { themeReducer } from "../reducers/themeReducer";
import {
  categoriesGetReudcer,
  productCategoryReducer,
  productCreateReducer,
  productDeleteReducer,
  productGetAllReducer,
  productGetReducer,
  productUpdateReducer,
} from "../reducers/productReducer";
import { cartReducer } from "../reducers/cartReducer";
import {
  orderCreateReducer,
  orderDeleteReducer,
  orderGetAllReducer,
  orderGetMineReducer,
  orderUpdateReducer,
} from "../reducers/orderReducer";
import { dashboardReducer } from "../reducers/dashboardReducer";

const initialState = {
  userSignin: {
    userInfo: localStorage.getItem("userInfo")
      ? JSON.parse(localStorage.getItem("userInfo"))
      : null,
  },
  cart: {
    cartItems: localStorage.getItem("cartItems")
      ? JSON.parse(localStorage.getItem("cartItems"))
      : [],
  },
  darkMode: localStorage.getItem("darkMode")
    ? JSON.parse(localStorage.getItem("darkMode"))
    : false,
};

const reducer = combineReducers({
  userSignin: userSigninReducer,
  userSignup: userSignupReducer,
  userUpdate: userUpdateReducer,
  productList: productGetAllReducer,
  productsCategory: productCategoryReducer,
  productDetails: productGetReducer,
  productCreate: productCreateReducer,
  productDelete: productDeleteReducer,
  productUpdate: productUpdateReducer,
  orderMineList: orderGetMineReducer,
  orderList: orderGetAllReducer,
  orderCreate: orderCreateReducer,
  orderUpdate: orderUpdateReducer,
  orderDelete: orderDeleteReducer,
  categoryList: categoriesGetReudcer,
  cart: cartReducer,

  dashboard: dashboardReducer,
  darkMode: themeReducer,
});

const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
  reducer,
  initialState,
  composeEnhancer(applyMiddleware(thunk))
);

export default store;
