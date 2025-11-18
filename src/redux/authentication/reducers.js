import { LOGIN_FAILURE, LOGIN_REQUEST, LOGIN_SUCCESS, LOGIN_RESET } from "../actionTypes";

const initialState = {
  user: {},
  isAuth: false,
  isLoading: false,
  isError: false,
};

export const reducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case LOGIN_REQUEST:
      return { ...state, isLoading: true, isError: false };
    case LOGIN_SUCCESS:
      return { ...state, isLoading: false, isAuth: true, isError: false, user: payload };
    case LOGIN_FAILURE:
      return { ...state, isLoading: false, isAuth: false, isError: true };
    case LOGIN_RESET:
      return { ...state, isLoading: false, isAuth: false, isError: false };
    default:
      return state;
  }
};
