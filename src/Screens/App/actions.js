import { FETCH_USER_REQUESTING } from './constants';

export function fetchUserAction() {
  return {
    type: FETCH_USER_REQUESTING,
  };
}
