import {
  GET_CATEGORIES_FAIL,
  GET_CATEGORIES_REQUEST,
  GET_CATEGORIES_SUCCESS,
  PRODUCT_CATEGORY_FAIL,
  PRODUCT_CATEGORY_REQUEST,
  PRODUCT_CATEGORY_SUCCESS,
  PRODUCT_CREATE_FAIL,
  PRODUCT_CREATE_REQUEST,
  PRODUCT_CREATE_SUCCESS,
  PRODUCT_DELETE_FAIL,
  PRODUCT_DELETE_REQUEST,
  PRODUCT_DELETE_SUCCESS,
  PRODUCT_GETALL_FAIL,
  PRODUCT_GETALL_REQUEST,
  PRODUCT_GETALL_SUCCESS,
  PRODUCT_GET_FAIL,
  PRODUCT_GET_REQUEST,
  PRODUCT_GET_SUCCESS,
  PRODUCT_UPDATE_FAIL,
  PRODUCT_UPDATE_REQUEST,
  PRODUCT_UPDATE_SUCCESS,
  SET_PRODUCTS,
} from "../constants/productContant";
import axiosInstance from "../utils/axiosInstant";

export const createProduct = (product) => async (dispatch, getState) => {
  dispatch({ type: PRODUCT_CREATE_REQUEST });
  try {
    const { data } = await axiosInstance.post("/api/products/create", product);
    dispatch({
      type: PRODUCT_CREATE_SUCCESS,
      payload: data,
      success: true,
    });
    const {
      productList: { products },
    } = getState();
    const updatedProducts = [...products, data];
    dispatch({ type: SET_PRODUCTS, payload: updatedProducts });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({ type: PRODUCT_CREATE_FAIL, payload: message });
  }
};

export const updateProduct =
  (product, productId) => async (dispatch, getState) => {
    dispatch({ type: PRODUCT_UPDATE_REQUEST, payload: product });
    try {
      const { data } = await axiosInstance.put(
        `/api/products/${productId}/update`,
        product
      );
      dispatch({ type: PRODUCT_UPDATE_SUCCESS, success: true, payload: data });
      const {
        productList: { products },
      } = getState();
      const updatedProducts = products.map((prod) =>
        prod._id === productId ? data : prod
      );
      dispatch({ type: SET_PRODUCTS, payload: updatedProducts });
    } catch (error) {
      const message =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message;
      dispatch({ type: PRODUCT_UPDATE_FAIL, error: message });
    }
  };

export const deleteProduct = (productId) => async (dispatch, getState) => {
  dispatch({ type: PRODUCT_DELETE_REQUEST, payload: productId });
  try {
    const { data } = axiosInstance.delete(`/api/products/${productId}/delete`);
    dispatch({ type: PRODUCT_DELETE_SUCCESS, success: true, payload: data });
    const {
      productList: { products },
    } = getState();
    const updatedProducts = products.filter(
      (product) => product._id !== productId
    );
    dispatch({ type: SET_PRODUCTS, payload: updatedProducts });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({ type: PRODUCT_DELETE_FAIL, payload: message });
  }
};

export const getProducts = (page, perPage) => async (dispatch) => {
  dispatch({ type: PRODUCT_GETALL_REQUEST });
  try {
    const { data } = await axiosInstance.get(
      `/api/products/?page=${page}&perPage=${perPage}`
    );
    dispatch({
      type: PRODUCT_GETALL_SUCCESS,
      payload: data,
    });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({ type: PRODUCT_GETALL_FAIL, payload: message });
  }
};

export const getProduct = (productId) => async (dispatch) => {
  dispatch({ type: PRODUCT_GET_REQUEST });
  try {
    const { data } = await axiosInstance.get(`/api/products/${productId}`);
    dispatch({
      type: PRODUCT_GET_SUCCESS,
      payload: data.product,
    });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({ type: PRODUCT_GET_FAIL, payload: message });
  }
};

export const getProductsByCategory =
  (category, page, perPage) => async (dispatch) => {
    dispatch({ type: PRODUCT_CATEGORY_REQUEST });
    try {
      const { data } = await axiosInstance.get(
        `/api/products/categories/${category}?page=${page}&perPage=${perPage}`
      );
      dispatch({
        type: PRODUCT_CATEGORY_SUCCESS,
        payload: data,
      });
    } catch (error) {
      const message =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message;
      dispatch({ type: PRODUCT_CATEGORY_FAIL, payload: message });
    }
  };

export const getCategories = () => async (dispatch) => {
  dispatch({ type: GET_CATEGORIES_REQUEST });
  try {
    const { data } = await axiosInstance.get("/api/categories/getAll");
    dispatch({
      type: GET_CATEGORIES_SUCCESS,
      payload: data,
    });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({ type: GET_CATEGORIES_FAIL, payload: message });
  }
};
