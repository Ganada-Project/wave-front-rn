/*
 * SamleScreen Constants
 * Each action has a corresponding type, which the reducer knows and picks up on.
 * To avoid weird typos between the reducer and the actions, we save them as
 * constants here. We prefix them with 'yourproject/YourComponent' so we avoid
 * reducers accidentally picking up actions they shouldn't.
 *
 * Follow this format:
 * export const YOUR_ACTION_CONSTANT = 'yourproject/YourContainer/YOUR_ACTION_CONSTANT';
 */
export const GET_SAMPLE_REQUEST = 'WearBe/SampleScreen/GET_SAMPLE_REQUEST';
export const GET_SAMPLE_SUCCESS = 'WearBe/SampleScreen/GET_SAMPLE_SUCCESS';
export const GET_SAMPLE_FAIL = 'WearBe/SampleScreen/GET_SAMPLE_FAIL';
