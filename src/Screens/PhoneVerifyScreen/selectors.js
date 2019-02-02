/**
 * SignInScreen selectors
 */

import { createSelector } from 'reselect';

const selectGlobal = (state) => state.get('global');
const selectPhoneVerification = (state) => state.get('phoneVerificationReducer');
const makeSelectVerifyNumber = () => createSelector(selectPhoneVerification, (phoneVerification) => phoneVerification.get('verifyNumber'));
const makeSelectVerifyLoading = () => createSelector(selectPhoneVerification, (phoneVerification) => phoneVerification.get('verifyLoading'));

export { makeSelectVerifyNumber, makeSelectVerifyLoading };
