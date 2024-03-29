/*
 * Info1ScreenConstants
 * Each action has a corresponding type, which the reducer knows and picks up on.
 * To avoid weird typos between the reducer and the actions, we save them as
 * constants here. We prefix them with 'yourproject/YourComponent' so we avoid
 * reducers accidentally picking up actions they shouldn't.
 *
 * Follow this format:
 * export const YOUR_ACTION_CONSTANT = 'yourproject/YourContainer/YOUR_ACTION_CONSTANT';
 */

export const CHECK_NICKNAME_REQUEST =
  'WearBe/RegisterName/CHECK_NICKNAME_REQUEST';
export const CHECK_NICKNAME_FAIL = 'WearBe/RegisterName/CHECK_NICKNAME_FAIL';
export const CHECK_NICKNAME_SUCCESS =
  'WearBe/RegisterName/CHECK_NICKNAME_SUCCESS';

export const SIGN_UP_REQUEST = 'WearBe/RegisterName/SIGN_UP_REQUEST';
export const SIGN_UP_FAIL = 'WearBe/RegisterName/SIGN_UP_FAIL';
export const SIGN_UP_SUCCESS = 'WearBe/RegisterName/SIGN_UP_SUCCESS';
