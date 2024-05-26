import {
  ORDER_CREATE_FAIL,
  ORDER_CREATE_REQUEST,
  ORDER_CREATE_RESET,
  ORDER_CREATE_SUCCESS,
  ORDER_DELETE_FAIL,
  ORDER_DELETE_REQUEST,
  ORDER_DELETE_RESET,
  ORDER_DELETE_SUCCESS,
  ORDER_GETALL_FAIL,
  ORDER_GETALL_REQUEST,
  ORDER_GETALL_SUCCESS,
  ORDER_GETMINE_FAIL,
  ORDER_GETMINE_REQUEST,
  ORDER_GETMINE_SUCCESS,
  ORDER_UPDATE_FAIL,
  ORDER_UPDATE_REQUEST,
  ORDER_UPDATE_RESET,
  ORDER_UPDATE_SUCCESS,
  SET_ORDER,
} from "../constants/orderConstant";

export const orderCreateReducer = (state = {}, action) => {
  switch (action.type) {
    case ORDER_CREATE_REQUEST: {
      return { loading: false };
    }
    case ORDER_CREATE_SUCCESS: {
      return { loading: false, success: true, order: action.payload };
    }
    case ORDER_CREATE_FAIL: {
      return { loading: false, error: action.payload };
    }
    case ORDER_CREATE_RESET: {
      return {};
    }
    default:
      return state;
  }
};

export const orderGetMineReducer = (state = { orders: [] }, action) => {
  switch (action.type) {
    case ORDER_GETMINE_REQUEST: {
      return { loading: true };
    }
    case ORDER_GETMINE_SUCCESS: {
      return { loading: false, orders: action.payload };
    }
    case ORDER_GETMINE_FAIL: {
      return { loading: false, error: action.payload };
    }
    default:
      return state;
  }
};

export const orderGetAllReducer = (state = { orders: [] }, action) => {
  switch (action.type) {
    case ORDER_GETALL_REQUEST: {
      return { loading: true };
    }
    case ORDER_GETALL_SUCCESS: {
      return { ...state, ...action.payload, loading: false };
    }
    case ORDER_GETALL_FAIL: {
      return { loading: false, error: action.payload };
    }
    case SET_ORDER: {
      return { ...state, orders: action.payload };
    }
    default:
      return state;
  }
};

export const orderUpdateReducer = (state = {}, action) => {
  switch (action.type) {
    case ORDER_UPDATE_REQUEST:
      return { loading: true };
    case ORDER_UPDATE_SUCCESS:
      return { loading: false, success: true, updateOrder: action.payload };
    case ORDER_UPDATE_FAIL:
      return { loading: false, error: action.payload };
    case ORDER_UPDATE_RESET:
      return {};
    default:
      return state;
  }
};

export const orderDeleteReducer = (state = {}, action) => {
  switch (action.type) {
    case ORDER_DELETE_REQUEST:
      return { loading: true };
    case ORDER_DELETE_SUCCESS:
      return { loading: false, success: true };
    case ORDER_DELETE_FAIL:
      return { loading: false, error: action.payload };
    case ORDER_DELETE_RESET:
      return {};
    default:
      return state;
  }
};
