/* eslint-disable import/prefer-default-export */
/* eslint-disable no-undef */
import axios from 'axios';
import { browserHistory } from 'react-router';
import * as actionTypes from '../actionTypes';
import setAuthorizationToken from '../../utils/setAuth';

/**
 * deleteUser
 * @export
 * @param {Object} userId
 * @returns {Object} object
 */
export default (userId) => {
  const token = window.localStorage.getItem('token');
  return (dispatch) => {
    setAuthorizationToken(token);
    return axios.delete(`/api/user/${userId}`)
    .then((user) => {
      console.log(user);
      const data = user.data.User
      dispatch({
        type: actionTypes.USER_DELETED,
        status: 'success',
        userId,
        data
      });
      Materialize.toast(
        'User deleted',
        3000,
        'green'
        );
    }).catch((error) => {
      let errorData;
        if(error.response.data.errors !== undefined) {
          errorData = error.response.data.errors[0].message
        } else {
          errorData = error.response.data.message
        }
        Materialize.toast(
          errorData, 3000, 'red');
      dispatch({
        type: actionTypes.USER_DELETION_FAILED,
        status: 'failed',
        error: error.message
      });
    });
  };
};