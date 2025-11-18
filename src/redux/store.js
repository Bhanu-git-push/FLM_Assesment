import { combineReducers, legacy_createStore } from "redux";
import { reducer as companyFetchReducer } from "./CompaniesDataReducer/reducers.js";
import { reducer as AuthenticationReducer } from "./authentication/reducers.js";
// import { reducer as UserFetchReducer } from "./UsersDataReducer/reducers.js"

const rootReducer = combineReducers({
  companyFetchReducer,
  AuthenticationReducer,
//   UserFetchReducer
});

export const store = legacy_createStore(rootReducer);