// request
import axios from 'axios';
// constants
import { API_URL } from '../../constants';
/**
 * @desc: get user info
 * @param: string $idToken
 * @return: string idToken
 */
export function verifyPhoneNumberApi({ number }) {
  let params = '?';
  if (number) params = `${params}phone=${number}`;
  const options = {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    url: `${API_URL}api/auth/phone${params}`,
  };
  return new Promise((resolve, reject) => {
    axios(options)
      .then((response) => response.data)
      .then((data) => resolve(data))
      .catch((error) => reject(error));
  });
}
