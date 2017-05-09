/* eslint-disable import/prefer-default-export */
/* eslint-disable no-undef */
import axios from 'axios';
import jwtDecode from 'jwt-decode';
import { Router } from 'react-router';
import * as actionTypes from '../actionTypes';

/**
 * userSignupRequest
 * @export
 * @param {Object} userData
 * @returns {Object} returns object
 */
export default (userData) => {
  userData.roleId = parseInt((userData.roleId), 10);
  return (dispatch) => {
    return axios.post('/api/user', userData)
      .then((response) => {
        window.localStorage.setItem('token', response.data.token);
        const user = jwtDecode(response.data.token);
        dispatch({
          type: actionTypes.LOGIN_SUCCESSFUL,
          user
        });
        Materialize.toast('Welcome!', 2000, 'green');
      }).catch((error) => {
        Materialize.toast(
          'Something went wrong creating a new user', 3000, 'red');
        dispatch({
          type: actionTypes.SIGNUP_FAILED,
          message: error
        });
      });
  };
};
