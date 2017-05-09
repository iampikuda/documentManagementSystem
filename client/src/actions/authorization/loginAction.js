/* eslint-disable import/prefer-default-export */
/* eslint-disable no-undef */
import axios from 'axios';
import jwtDecode from 'jwt-decode';
import setAuthorizationToken from '../../utils/setAuth';
import * as actionTypes from '../actionTypes';

/**
 * userLoginRequest
 * @export
 * @param {Object} loginCredentials
 * @returns {Object} return dispatch
 */
export default (loginCredentials) => {
  return (dispatch) => {
    return axios.post('/api/user/login', loginCredentials)
      .then((response) => {
        const token = response.data.token;
        const user = jwtDecode(token).user;
        window.localStorage.setItem('token', token);
        setAuthorizationToken(token);
        dispatch({
          type: actionTypes.LOGIN_SUCCESSFUL,
          user,
          token,
          message: 'Login Successful'
        });
        Materialize.toast('Login Successful', 2000, 'green');
      }).catch((error) => {
        Materialize.toast(
          'Please check the email and/or password',
          3000, 'red');
        dispatch({
          type: actionTypes.LOGIN_ERROR,
          message: error.response.data.error
        });
      });
  };
};
