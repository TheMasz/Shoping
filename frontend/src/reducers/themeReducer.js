import { TOGGLE_DARK_MODE } from "../constants/appConstant";

export const themeReducer = (state = {}, action) => {
  switch (action.type) {
    case TOGGLE_DARK_MODE:
      localStorage.setItem("darkMode", JSON.stringify(!state));
      return !state;
    default:
      return state;
  }
};
