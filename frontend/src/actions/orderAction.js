import {
  ORDER_CREATE_FAIL,
  ORDER_CREATE_REQUEST,
  ORDER_CREATE_SUCCESS,
  ORDER_DELETE_FAIL,
  ORDER_DELETE_SUCCESS,
  ORDER_GETALL_FAIL,
  ORDER_GETALL_REQUEST,
  ORDER_GETALL_SUCCESS,
  ORDER_GETMINE_FAIL,
  ORDER_GETMINE_REQUEST,
  ORDER_GETMINE_SUCCESS,
  ORDER_UPDATE_FAIL,
  ORDER_UPDATE_REQUEST,
  ORDER_UPDATE_SUCCESS,
  SET_ORDER,
} from "../constants/orderConstant";
import axiosInstance from "../utils/axiosInstant";

export const createOrder = (carts) => async (dispatch, getState) => {
  dispatch({ type: ORDER_CREATE_REQUEST });
  try {
    const {
      userSignin: { userInfo },
    } = getState();
    const { data } = await axiosInstance.post("/api/orders/create", {
      carts,
      userId: userInfo._id,
    });
    dispatch({
      type: ORDER_CREATE_SUCCESS,
      payload: data,
    });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({ type: ORDER_CREATE_FAIL, payload: message });
  }
};

export const getMyOrder = () => async (dispatch, getState) => {
  dispatch({ type: ORDER_GETMINE_REQUEST });
  try {
    const {
      userSignin: { userInfo },
    } = getState();
    const { data } = await axiosInstance.get(
      `/api/orders/user/${userInfo._id}`
    );
    dispatch({ type: ORDER_GETMINE_SUCCESS, payload: data.orders });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({ type: ORDER_GETMINE_FAIL, payload: message });
  }
};

export const getAllOrder = (page, perPage) => async (dispatch) => {
  dispatch({ type: ORDER_GETALL_REQUEST });
  try {
    const { data } = await axiosInstance.get(
      `/api/orders/admin?page=${page}&perpage=${perPage}`
    );
    dispatch({ type: ORDER_GETALL_SUCCESS, payload: data });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({ type: ORDER_GETALL_FAIL, payload: message });
  }
};

export const updateOrder =
  (orderStatus, orderId) => async (dispatch, getState) => {
    dispatch({ type: ORDER_UPDATE_REQUEST, payload: { orderId, orderStatus } });
    try {
      const { data } = await axiosInstance.put(
        `/api/orders/admin/${orderId}/update`,
        { orderStatus }
      );
      dispatch({
        type: ORDER_UPDATE_SUCCESS,
        success: true,
        payload: data.order,
      });
      const {
        orderList: { orders },
      } = getState();
      const updatedOrders = orders.map((order) =>
        order._id === orderId ? { ...order, status: data.order.status } : order
      );
      dispatch({ type: SET_ORDER, payload: updatedOrders });
    } catch (error) {
      const message =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message;
      dispatch({ type: ORDER_UPDATE_FAIL, payload: message });
    }
  };

export const deleteOrder = (orderId) => async (dispatch, getState) => {
  dispatch({ type: ORDER_UPDATE_REQUEST, payload: orderId });
  try {
    const { data } = await axiosInstance.delete(
      `/api/orders/admin/${orderId}/delete`
    );
    dispatch({ type: ORDER_DELETE_SUCCESS, payload: data });
    const {
      orderList: { orders },
    } = getState();
    const updatedOrders = orders.filter((order) => order._id !== orderId);
    console.log(updatedOrders);
    dispatch({ type: SET_ORDER, payload: updatedOrders });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({ type: ORDER_DELETE_FAIL, payload: message });
  }
};
