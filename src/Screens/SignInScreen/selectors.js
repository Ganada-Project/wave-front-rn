/**
 * SignInScreen selectors
 */

import { createSelector } from 'reselect';
import { initialState } from './reducer';

const selectSignIn = (state) => state.get('signIn', initialState);

const makeSelectErrors = () => createSelector(
  selectSignIn,
  (globalState) => globalState.get('errors'),
);

export { makeSelectErrors };
