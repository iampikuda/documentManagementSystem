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
        deletedUserId: userId,
        deletedUser: data
      });
      Materialize.toast(
        'User deleted',
        3000,
        'green'
        );
    }).catch((err) => {
      Materialize.toast(
        'Something went wrong deleting a new user',
        3000,
        'red'
        );
      dispatch({
        type: actionTypes.USER_DELETION_FAILED,
        status: 'failed',
        error: err.message
      });
    });
  };
};