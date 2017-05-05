import axios from 'axios';

export default function setAuthorisationToken(token) {
  delete axios.defaults.headers.common['x-access-token'];
  axios.defaults.headers.common['x-access-token'] = token;
}
