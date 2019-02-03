/**
 * SignInScreen selectors
 */

import { createSelector } from 'reselect';
import { initialState } from './reducer';

const selectPhoneVerification = (state) => state.get('phoneVerify', initialState);
const makeSelectVerifyNumber = () => createSelector(
  selectPhoneVerification,
  (phoneVerification) => phoneVerification.get('verifyNumber'),
);
const makeSelectVerifyLoading = () => createSelector(
  selectPhoneVerification,
  (phoneVerification) => phoneVerification.get('verifyLoading'),
);

export { makeSelectVerifyNumber, makeSelectVerifyLoading };
