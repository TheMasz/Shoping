import {
  USER_SIGNIN_FAIL,
  USER_SIGNIN_REQUEST,
  USER_SIGNIN_SUCCESS,
  USER_SIGNOUT,
  USER_SIGNUP_FAIL,
  USER_SIGNUP_REQUEST,
  USER_SIGNUP_SUCCESS,
  USER_UPDATE_FAIL,
  USER_UPDATE_REQUEST,
  USER_UPDATE_SUCCESS,
} from "../constants/userConstant";
import axiosInstance from "../utils/axiosInstant";

export const signin = (emailOrUsername, password) => async (dispatch) => {
  dispatch({
    type: USER_SIGNIN_REQUEST,
    payload: { emailOrUsername, password },
  });
  try {
    const { data } = await axiosInstance.post("/api/auth/signin", {
      email_username: emailOrUsername,
      password,
    });
    localStorage.setItem("userInfo", JSON.stringify(data));
    dispatch({ type: USER_SIGNIN_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: USER_SIGNIN_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const signup = (email, password, cf_password) => async (dispatch) => {
  dispatch({
    type: USER_SIGNUP_REQUEST,
    payload: { email, password, cf_password },
  });
  try {
    const { data } = await axiosInstance.post("/api/auth/signup", {
      email,
      password,
      cf_password,
    });
    dispatch({ type: USER_SIGNUP_SUCCESS, payload: data });
    dispatch({ type: USER_SIGNIN_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: USER_SIGNUP_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const signout = () => async (dispatch) => {
  localStorage.removeItem("userInfo");
  const { data } = await axiosInstance.post("/api/auth/signout");
  dispatch({ type: USER_SIGNOUT });
};

export const updateProfile =
  (username, address, tel) => async (dispatch, getState) => {
    dispatch({
      type: USER_UPDATE_REQUEST,
      payload: { username, address, tel },
    });
    try {
      const {
        userSignin: { userInfo },
      } = getState();
      const { data } = await axiosInstance.put(
        `/api/auth/profile/${userInfo._id}/update`,
        {
          username,
          address,
          tel,
        }
      );
      localStorage.setItem("userInfo", JSON.stringify(data));
      dispatch({ type: USER_UPDATE_SUCCESS, success: true, payload: data });
    } catch (error) {
      dispatch({
        type: USER_UPDATE_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };
