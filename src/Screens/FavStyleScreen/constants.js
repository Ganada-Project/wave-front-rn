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

export const FETCH_STYLES_REQUESTING =
  'WearBe/FavStyle/FETCH_STYLES_REQUESTING';
export const FETCH_STYLES_REQUESTING_FAIL =
  'WearBe/FavStyle/FETCH_STYLES_REQUESTING_FAIL';
export const FETCH_STYLES_REQUESTING_SUCCESS =
  'WearBe/FavStyle/FETCH_STYLES_REQUESTING_SUCCESS';
