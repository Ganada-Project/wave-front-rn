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

export const TRY_SIGN_OUT = 'Wave/profile/TRY_SIGN_OUT';
export const TRY_SIGN_OUT_FAIL = 'Wave/profile/TRY_SIGN_OUT_FAIL';
export const TRY_SIGN_OUT_SUCCESS = 'Wave/profile/TRY_SIGN_OUT_SUCCESS';
