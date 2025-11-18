import { LOGIN_FAILURE, LOGIN_REQUEST, LOGIN_SUCCESS, LOGIN_RESET } from "../actionTypes";

export const loginRequestAction = () => {
  return { type: LOGIN_REQUEST };
};

export const loginSuccessAction = (user) => {
  return { type: LOGIN_SUCCESS, payload: user };
};

export const loginFailureAction = (error) => {
  return { type: LOGIN_FAILURE, payload: error };
};

export const loginResetAction = (error) => {
    return { type: LOGIN_RESET, payload: error}
}