/* eslint-disable import/prefer-default-export */
/* eslint-disable no-undef */
import axios from 'axios';
import jwtDecode from 'jwt-decode';
import setAuthorizationToken from '../../utils/setAuth';


export default (loginCredentials) => {
  return (dispatch) => {
    return axios.post('/api/user/login', loginCredentials)
      .then((response) => {
        const token = response.data.token;
        const user = jwtDecode(token).user;
        window.localStorage.setItem('token', token);
        setAuthorizationToken(token);
        dispatch({
          type: 'LOGIN_SUCCESSFUL',
          user,
          token,
          message: 'Login Successful'
        });
      }).catch((error) => {
        dispatch({
          type: 'LOGIN_ERROR',
          message: error.response.data.error
        });
      });
  };
};
