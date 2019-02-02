// request
import axios from 'axios';
// constants
import { API_URL } from '../../constants';
/**
 * @desc: get user info
 * @param: string $idToken
 * @return: string idToken
 */
export function defaultApi({ idToken }) {
  const options = {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      'x-access-token': `${idToken}`,
    },
    url: `${API_URL}api/user/me`,
    // validateStatus: status => (status > 500),
  };
  return new Promise((resolve, reject) => {
    axios(options)
      .then((response) => response.data)
      .then((data) => resolve(data))
      .catch((error) => reject(error));
  });
}
