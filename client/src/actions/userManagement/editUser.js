/* eslint-disable import/prefer-default-export */
/* eslint-disable no-undef */
import axios from 'axios';
import { browserHistory, Link } from 'react-router';
import * as actionTypes from '../actionTypes';
import setAuthorizationToken from '../../utils/setAuth';

/**
 * edit User
 * @export
 * @param {Object} userData
 * @param {Object} userId
 * @returns {Object} object
 */
export default (userData, userId) => {
  const token = window.localStorage.getItem('token');
  return (dispatch) => {
    setAuthorizationToken(token);
    console.log(userData, userId, 'eidiininasd');
    return axios.put(`/api/user/${userId}`, userData)
      .then((res) => {
        dispatch({
          type: actionTypes.USER_UPDATED,
          user: Object.assign({}, userData, {
            id: userId
          })
        });
        Materialize.toast(
          'User edited',
          3000,
          'green'
          );
          browserHistory.push('/dashboard');
      }).catch((err) => {
        Materialize.toast(
          'Something went wrong editing user',
          3000,
          'red'
          );
        dispatch({
          type: actionTypes.USER_UPDATE_FAILED,
          status: 'failed',
          error: err.message
        });
      });
  };
};
