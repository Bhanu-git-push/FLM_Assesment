import { COMPANY_FETCH_REQUEST, COMPANY_FETCH_SUCCESS, COMPANY_FETCH_FAILURE } from "../actionTypes";

const initialState = {
  companies: [],
  isLoading: false,
  isError: false,
};

export const reducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case COMPANY_FETCH_REQUEST:
      return { ...state, isLoading: true, isError: false };
    case COMPANY_FETCH_SUCCESS:
      return { ...state, isLoading: false, companies: payload };
    case COMPANY_FETCH_FAILURE:
      return { ...state, isLoading: false, isError: true };
    default:
      return state;
  }
};
