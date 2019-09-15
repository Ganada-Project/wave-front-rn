/*
 * SampleScreen Reducer
 *
 * The reducer takes care of our data. Using actions, we can
 * update our application state. To add a new action,
 * add it to the switch statement in the reducer function
 *
 */
import { fromJS } from 'immutable';

import {
  GET_SIZE_DETAIL_FAIL,
  GET_SIZE_DETAIL_SUCCESS,
  GET_SIZE_DETAIL_REQUEST,
  sizeDetail,
} from './constants';

// The initial state of the App
export const initialState = fromJS({
  sizeDetail,
  sizeDetailLoading: false,
});

function sizeDetailReducer(state = initialState, action) {
  switch (action.type) {
    case GET_SIZE_DETAIL_REQUEST:
      return state.set('sizDetailLoading', true);
    case GET_SIZE_DETAIL_SUCCESS:
      return state
        .set('sizeDetailLoading', false)
        .set('sizeDetail', fromJS(action.sizeCard));
    case GET_SIZE_DETAIL_FAIL:
      return state
        .set('sizeDetailLoading', false)
        .set('messages', [])
        .set('errors', [
          {
            body: action.error,
            time: new Date(),
          },
        ]);

    default:
      return state;
  }
}

export default sizeDetailReducer;
