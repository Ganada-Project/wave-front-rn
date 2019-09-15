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
  GET_SAMPLE_FAIL,
  GET_SAMPLE_REQUEST,
  GET_SAMPLE_SUCCESS,
} from './constants';

// The initial state of the App
export const initialState = fromJS({
  sample: '',
});

function sampleReducer(state = initialState, action) {
  switch (action.type) {
    // start login
    case GET_SAMPLE_REQUEST:
      return state
        .set('loading', true)
        .set('successful', false)
        .set('errors', []);
    case GET_SAMPLE_SUCCESS:
      return state
        .set('loading', false)
        .set('successful', true)
        .set('messages', [])
        .set('errors', []);
    case GET_SAMPLE_FAIL:
      return state
        .set('loading', false)
        .set('successful', false)
        .set('messages', [])
        .set('errors', [
          {
            body: action.error.toString(),
            time: new Date(),
          },
        ]);

    default:
      return state;
  }
}

export default sampleReducer;
