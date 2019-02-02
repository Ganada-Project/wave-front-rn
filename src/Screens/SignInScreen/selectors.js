/**
 * SignInScreen selectors
 */

import { createSelector } from 'reselect';

const selectLogin = (state) => state.get('signInScreenReducer');
const selectGlobal = (state) => state.get('global');
const makeSelectLoading = () => createSelector(selectGlobal, (globalState) => globalState.getIn(['userData', 'loading']));
const makeSelectEmail = () => createSelector(selectGlobal, (globalState) => globalState.getIn(['userData', 'user', 'email']));
const makeSelectUsername = () => createSelector(selectLogin, (LoginState) => LoginState.get('username'));

const makeSelectSuccessful = () => createSelector(selectLogin, (LoginState) => LoginState.get('successful'));

export {
  selectLogin,
  makeSelectEmail,
  makeSelectUsername,
  makeSelectLoading,
  makeSelectSuccessful,
};
