import { TOGGLE_DARK_MODE } from "../constants/appConstant";

export const toggleDarkMode = () => (dispatch, getState) => {
  dispatch({
    type: TOGGLE_DARK_MODE,
  });
  localStorage.setItem("darkMode", JSON.stringify(getState().darkMode));
};
