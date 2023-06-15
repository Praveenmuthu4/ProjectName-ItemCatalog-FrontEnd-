import {
  legacy_createStore as createStore,
  applyMiddleware,
  combineReducers,
} from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import {
  authReducer,
  forgotPasswordReducer,
  updatePasswordReducer,
} from "./authReducer";

const reducer = combineReducers({
  auth: authReducer,
  forgotPassword: forgotPasswordReducer,
  user: updatePasswordReducer,
});

const middleware = [thunk];
const store = createStore(
  reducer,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
