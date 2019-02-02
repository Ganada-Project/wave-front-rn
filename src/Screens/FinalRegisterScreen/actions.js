/*
 * Default Actions
 *
 */

import { POST_REGISTER_REQUESTING } from './constants';

/**
 * Changes the input field of the form
 *
 * @param  {} email email
 * @param  {} password password
 *
 * @return {}    An action object with a type of CHANGE_USERNAME
 */
export function registerUserAction({
  password,
  weight,
  height,
  waist,
  phone,
  gender,
  name,
  nickname,
  stylesArray,
  imageBase,
}) {
  return {
    type: POST_REGISTER_REQUESTING,
    payload: {
      password,
      weight,
      height,
      gender,
      waist,
      name,
      phone,
      nickname,
      stylesArray,
      imageBase,
    },
  };
}
