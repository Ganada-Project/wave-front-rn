/*
 * AppConstants
 * Each action has a corresponding type, which the reducer knows and picks up on.
 * To avoid weird typos between the reducer and the actions, we save them as
 * constants here. We prefix them with 'yourproject/YourComponent' so we avoid
 * reducers accidentally picking up actions they shouldn't.
 *
 * Follow this format:
 * export const YOUR_ACTION_CONSTANT = 'yourproject/YourContainer/YOUR_ACTION_CONSTANT';
 * Copyright : Ganada Project
 */

export const VERIFY_PHONE_NUMBER = 'Wave/PhoneVerify/VERIFY_PHONE_NUMBER';
export const VERIFY_PHONE_NUMBER_FAIL = 'Wave/PhoneVerify/VERIFY_PHONE_NUMBER_FAIL';
export const VERIFY_PHONE_NUMBER_SUCCESS = 'Wave/PhoneVerify/VERIFY_PHONE_NUMBER_SUCCESS';

export const CHECK_PHONE_NUMBER_REQUEST = 'Wave/PhoneVerify/CHECK_PHONE_NUMBER_REQUEST';
export const CHECK_PHONE_NUMBER_FAIL = 'Wave/PhoneVerify/CHECK_PHONE_NUMBER_FAIL';
export const CHECK_PHONE_NUMBER_SUCCESS = 'Wave/PhoneVerify/CHECK_PHONE_NUMBER_SUCCESS';
