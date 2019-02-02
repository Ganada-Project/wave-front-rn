// request
import axios from 'axios';
// constants
import { API_URL } from '../../constants';

/**
 * @desc: get user token
 * @param: string $email, string $password
 * @return: string $id_token
 */
export function getIdTokenApi({ email, password }) {
  const payload = {
    email,
    password,
  };
  const options = {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    url: `${API_URL}api/auth/login`,
    data: { ...payload },
  };
  return new Promise((resolve, reject) => {
    axios(options)
      .then((response) => response.data)
      .then((data) => resolve(data.token))
      .catch((error) => reject(error));
  });
}
