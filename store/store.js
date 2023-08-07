import { legacy_createStore as createStore, combineReducers } from "redux";
import appUserReducer from "./reducer/user.reducer";

const rootReducer = combineReducers({
  appUser: appUserReducer,
  listings: appUserReducer,
  userPreferences: appUserReducer,
});

export const store = createStore(rootReducer);
