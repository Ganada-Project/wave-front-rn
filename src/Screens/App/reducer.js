/*
 * AppReducer
 *
 * The reducer takes care of our data. Using actions, we can change our
 * application state.
 * To add a new action, add it to the switch statement in the reducer function
 *
 * Example:
 * case YOUR_ACTION_CONSTANT:
 *   return state.set('yourStateVariable', true);
 */

import { fromJS } from "immutable";

import {
  GET_USER_INFO_FAIL,
  GET_USER_INFO_REQUEST,
  GET_USER_INFO_SUCCESS,
  SIGN_OUT
} from "./constants";

// The initial state of the App
const initialState = fromJS({
  loading: false,
  error: false,
  idToken: "",
  userData: {
    brand_name: ""
  }
});

function appReducer(state = initialState, action) {
  switch (action.type) {
    case GET_USER_INFO_REQUEST:
      return state.set("loading", true);
    case GET_USER_INFO_SUCCESS:
      return state
        .set("userData", fromJS({ ...action.user }))
        .set("idToken", action.token)
        .set("loading", false);
    case GET_USER_INFO_FAIL:
      return state.set("loading", false);
    case SIGN_OUT:
      return state.set("userData", null).set("idToken", null);
    default:
      return state;
  }
}

export default appReducer;
