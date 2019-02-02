/**
 * SignInScreen selectors
 */

import { createSelector } from 'reselect';

const selectGlobal = (state) => state.get('global');
const makeSelectEmail = () => createSelector(selectGlobal, (globalState) => globalState.getIn(['userData', 'user', 'email']));
const makeSelectUsername = () => createSelector(selectLogin, (LoginState) => LoginState.get('username'));
export { makeSelectEmail, makeSelectUsername };
