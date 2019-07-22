/**
 * SignInScreen selectors
 */

import { createSelector } from 'reselect';

const selectGlobal = (state) => state.get('global');

const makeSelectUserData = () => createSelector(
  selectGlobal,
  (globalState) => globalState.get('userData'),
);

export { makeSelectUserData };
