/*
 * HomeConstants
 * Each action has a corresponding type, which the reducer knows and picks up on.
 * To avoid weird typos between the reducer and the actions, we save them as
 * constants here. We prefix them with 'yourproject/YourComponent' so we avoid
 * reducers accidentally picking up actions they shouldn't.
 * Author: ShinHyunJong
 * Application Name : WearBe *
 * Corpyright : Ganada Project
 */

export const GET_SIZE_CARDS_REQUEST = 'Wave/Home/GET_SIZE_CARDS_REQUEST';
export const GET_SIZE_CARDS_FAIL = 'Wave/Home/GET_SIZE_CARDS_FAIL';
export const GET_SIZE_CARDS_SUCCESS = 'Wave/Home/GET_SIZE_CARDS_SUCCESS';
