import { COMPANY_FETCH_REQUEST, COMPANY_FETCH_SUCCESS, COMPANY_FETCH_FAILURE } from "../actionTypes";

export const fetchCompaniesRequest = () => {
  return { type: COMPANY_FETCH_REQUEST }
};

export const fetchCompaniesSuccess = (payload) => {
  return { type: COMPANY_FETCH_SUCCESS, payload };
};

export const fetchCompaniesFailure = (error) => {
  return { type: COMPANY_FETCH_FAILURE, payload: error };
};
