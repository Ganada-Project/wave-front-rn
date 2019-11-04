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

export const GET_SIZE_CARDS_REQUEST = 'WearBe/Home/GET_SIZE_CARDS_REQUEST';
export const GET_SIZE_CARDS_FAIL = 'WearBe/Home/GET_SIZE_CARDS_FAIL';
export const GET_SIZE_CARDS_SUCCESS = 'WearBe/Home/GET_SIZE_CARDS_SUCCESS';

export const SET_SIZE_CARD_REQUEST = 'WearBe/Home/SET_SIZE_CARD_REQUEST';
export const SET_SIZE_CARD_SUCCESS = 'WearBe/Home/SET_SIZE_CARD_SUCCESS';

export const GET_ITEMS_REQUEST = 'WearBe/Home/GET_ITEMS_REQUEST';
export const GET_ITEMS_FAIL = 'WearBe/Home/GET_ITEMS_FAIL';
export const GET_ITEMS_SUCCESS = 'WearBe/Home/GET_ITEMS_SUCCESS';
