/*
 * Default Actions
 *
 */

import { FETCH_STYLES_REQUESTING } from './constants';

/**
 * Changes the input field of the form
 *
 * @param  {} email email
 * @param  {} password password
 *
 * @return {}    An action object with a type of CHANGE_USERNAME
 */
export function getAllStylesAction() {
  return {
    type: FETCH_STYLES_REQUESTING,
  };
}
