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
const makeSelectUserVerifyNumber = () => createSelector(
  selectPhoneVerification,
  (phoneVerification) => phoneVerification.get('userVerifyNumber'),
);
const makeSelectVerifyLoading = () => createSelector(
  selectPhoneVerification,
  (phoneVerification) => phoneVerification.get('verifyLoading'),
);

const makeSelectChecking = () => createSelector(
  selectPhoneVerification,
  (phoneVerification) => phoneVerification.get('checking'),
);

const makeSelectOverlap = () => createSelector(
  selectPhoneVerification,
  (phoneVerification) => phoneVerification.get('overlap'),
);

export {
  makeSelectVerifyNumber,
  makeSelectVerifyLoading,
  makeSelectChecking,
  makeSelectOverlap,
  makeSelectUserVerifyNumber,
};
