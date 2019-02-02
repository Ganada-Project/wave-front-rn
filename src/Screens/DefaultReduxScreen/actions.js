/*
 * Default Actions
 *
 */

import { FETCH_DEFAULT_REQUESTING } from './constants';

/**
 * Changes the input field of the form
 *
 * @param  {} email email
 * @param  {} password password
 *
 * @return {}    An action object with a type of CHANGE_USERNAME
 */
export function defaultAction({}) {
  return {
    type: FETCH_DEFAULT_REQUESTING,
    payload: {},
  };
}
