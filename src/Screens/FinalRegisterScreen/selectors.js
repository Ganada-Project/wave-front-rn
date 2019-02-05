/**
 * SignInScreen selectors
 */

import { createSelector } from 'reselect';
import { initialState } from './reducer';

const selectFinalRegister = (state) => state.get('finalRegister', initialState);
const makeSelectRegisterLoading = () => createSelector(
  selectFinalRegister,
  (globalState) => globalState.get('registerLoading'),
);

export { makeSelectRegisterLoading };
