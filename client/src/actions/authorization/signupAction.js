import axios from 'axios';
import jwtDecode from 'jwt-decode';

export const loginSuccessful = user => ({ type: 'LOGIN_SUCCESSFUL', user });
export default (userData) => {
  console.log('|||||||||||||', userData);
  userData.roleId = parseInt((userData.roleId), 10);
  console.log('|||||||||||||', typeof (userData.roleId));
  console.log('|||||||||||||', userData);
  return (dispatch) => {
    return axios.post('/api/user', userData)
      .then((response) => {
        window.localStorage.setItem('token', response.data.token);
        const user = jwtDecode(response.data.token);
        dispatch({
          type: 'LOGIN_SUCCESSFUL',
          user
        });
      }).catch((err) => {
        dispatch({
          type: 'SIGNUP_FAILED',
          message: err.response.data.error
        });
      });
  };
};
