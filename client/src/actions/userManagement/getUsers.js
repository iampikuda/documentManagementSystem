/* eslint-disable import/prefer-default-export */
/* eslint-disable no-undef */import axios from 'axios';
import { browserHistory } from 'react-router';
import * as actionTypes from '../actionTypes';
import setAuthorizationToken from '../../utils/setAuth';

/**
 * Return action type
 * @export
 * @param {Object} users
 * @returns {Object} object
 */
const userGetSuccess = (users) => {
  return {
    type: actionTypes.GET_USER_SUCCESS,
    users,
    pageCount: users.data.metadata.pages

  };
};

/**
 * Get Users
 * @export
 * @param {Object} offset
 * @returns {Object} object
 */
export const viewUsers = (offset) => {//eslint-disable-line
  return (dispatch) => {
    const token = window.localStorage.getItem('token');
    setAuthorizationToken(token);
    axios.get('/api/user', {
      params: {
        offset
      }
    })
    .then((users) => {
      dispatch(userGetSuccess(users));
    })
    .catch((err) => {
    });
  };
};
