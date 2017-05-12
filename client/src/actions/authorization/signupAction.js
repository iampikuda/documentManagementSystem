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
  const token = window.localStorage.getItem('token');
  // console.log(userData)
  userData.roleId = parseInt((userData.roleId), 10);
  return (dispatch) => {
    return axios.post('/api/user', userData)
      .then((response) => {
        if(token){
          const user = jwtDecode(response.data.token);
          dispatch({
            type: 'User added',
            user
          });
          Materialize.toast('User added', 2000, 'green');
        } else {
          window.localStorage.setItem('token', response.data.token);
          const user = jwtDecode(response.data.token);
          dispatch({
            type: actionTypes.LOGIN_SUCCESSFUL,
            user
          });
          Materialize.toast('Welcome!', 2000, 'green');
        }
      }).catch((error) => {
        console.log(error.response.data);
        let errorData;
        if(error.response.data.errors !== undefined) {
          errorData = error.response.data.errors[0].message
        } else {
          errorData = error.response.data.message
        }
        Materialize.toast(
          errorData, 3000, 'red');
        dispatch({
          type: actionTypes.SIGNUP_FAILED,
          message: error
        });
      });
  };
};
