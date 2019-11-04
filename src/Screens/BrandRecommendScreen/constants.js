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

export const GET_ITEMS_REQUEST = 'WearBe/brandRecommend/GET_ITEMS_REQUEST';
export const GET_ITEMS_FAIL = 'WearBe/brandRecommend/GET_ITEMS_FAIL';
export const GET_ITEMS_SUCCESS =
  'WearBe/brandRecommend/FETCH_STYLES_REQUESTING_SUCCESS';
