/*
 * Register Actions
 *
 */

import { POST_REGISTER_REQUESTING } from './constants';

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
