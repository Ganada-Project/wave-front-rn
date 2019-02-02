// request
import axios from 'axios';
// constants
import { API_URL } from '../../constants';
/**
 * @desc: Register User
 * @param: Stirng phone
 * @param: String nickname
 */
export function registerUserApi({
  password,
  gender,
  nickname,
  name,
  phone,
  weight,
  height,
  waist,
  stylesArray,
  imageBase,
}) {
  const user = {
    email: 'sample@gmail.com',
    password,
    sex: gender,
    nickname,
    name,
    phone,
    styles: stylesArray,
    bodyImageBase64: imageBase,
    weight: 65,
    height: 183,
    waist: 32,
  };
  const options = {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    url: `${API_URL}api/auth/register`,
    data: { ...user },
    // validateStatus: status => (status > 500),
  };
  return new Promise((resolve, reject) => {
    axios(options)
      .then((response) => response.data)
      .then((data) => resolve(data))
      .catch((error) => reject(error));
  });
}

export function postPoseNetApi({
  password,
  gender,
  nickname,
  name,
  phone,
  weight,
  height,
  waist,
  stylesArray,
  imageBase,
}) {
  const user = {
    email: 'sample@gmail.com',
    password,
    sex: gender,
    nickname,
    name,
    phone,
    styles: stylesArray,
    bodyImageBase64: imageBase,
    weight: 65,
    height: 183,
    waist: 32,
  };
  const options = {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    url: `${API_URL}api/auth/register`,
    data: { ...user },
    // validateStatus: status => (status > 500),
  };
  return new Promise((resolve, reject) => {
    axios(options)
      .then((response) => response.data)
      .then((data) => resolve(data))
      .catch((error) => reject(error));
  });
}
