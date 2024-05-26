import {
  DASHBOARD_FAIL,
  DASHBOARD_REQUEST,
  DASHBOARD_SUCCESS,
} from "../constants/dashboardConstant";

export const dashboardReducer = (state = { analysis: [] }, action) => {
  switch (action.type) {
    case DASHBOARD_REQUEST:
      return { loading: true };
    case DASHBOARD_SUCCESS:
      return { loading: false, analysis: action.payload };
    case DASHBOARD_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};
