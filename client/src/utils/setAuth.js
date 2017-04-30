import axios from 'axios';

export default function setAuthorisationToken(token) {
  // if (token) {
  delete axios.defaults.headers.common['x-access-token'];
  axios.defaults.headers.common['x-access-token'] = token;
  console.log('TOKEN SET!!!!!');
  // } else {
  //   delete axios.defaults.headers.common['x-access-token'];
  // }
}
