import axios from 'axios';

/**
 * set authorizational header
 * @export
 * @param {String} token
 */
export default function setAuthorisationToken(token) {
  delete axios.defaults.headers.common['x-access-token'];
  axios.defaults.headers.common['x-access-token'] = token;
}
