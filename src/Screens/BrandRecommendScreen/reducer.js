/*
 * DefaultScreenReducer
 *
 * The reducer takes care of our data. Using actions, we can change our
 * application state.
 * To add a new action, add it to the switch statement in the reducer function
 *
 * Example:
 * case YOUR_ACTION_CONSTANT:
 *   return state.set('yourStateVariable', true);
 */
import { fromJS, List } from 'immutable';

import {
  GET_BRAND_RECOMMEND_FAIL,
  GET_BRAND_RECOMMEND_REQUEST,
  GET_BRAND_RECOMMEND_SUCCESS,
} from './constants';

// The initial state of the App
export const initialState = fromJS({
  recommendLoading: false,
  brands: [],
  error: null,
});

function brandRecommendReducer(state = initialState, action) {
  switch (action.type) {
    // start login
    case GET_BRAND_RECOMMEND_REQUEST:
      return state.set('recommendLoading', true);
    case GET_BRAND_RECOMMEND_SUCCESS:
      return state
        .set('recommendLoading', false)
        .set('brands', fromJS(action.payload.brands));

    case GET_BRAND_RECOMMEND_FAIL:
      return state.set('recommendLoading', false).set('error', action.error);

    default:
      return state;
  }
}

export default brandRecommendReducer;
