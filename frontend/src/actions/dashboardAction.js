import { DASHBOARD_FAIL, DASHBOARD_REQUEST, DASHBOARD_SUCCESS } from "../constants/dashboardConstant"
import axiosInstance from "../utils/axiosInstant";

export const getDashboard = () => async(dispatch) =>{
    dispatch({type: DASHBOARD_REQUEST})
    try {
        const { data } = await axiosInstance.get("/api/dashboard");
        dispatch({
          type: DASHBOARD_SUCCESS,
          payload: data,
        });
    } catch (error) {
        const message =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message;
      dispatch({ type: DASHBOARD_FAIL, payload: message });
    }
}