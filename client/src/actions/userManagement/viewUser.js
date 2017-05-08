/* eslint-disable import/prefer-default-export */
/* eslint-disable no-undef */
import axios from 'axios';
import * as actionTypes from '../actionTypes';
import setAuthorizationToken from '../../utils/setAuth';

/**
 * Get User
 * @export
 * @param {String} token
 * @param {Object} userId
 * @returns {Object} object
 */
export default (token, userId) => {
  return (dispatch) => {
    setAuthorizationToken(token);
    axios.get(`/api/user/${userId}`)
      .then((response) => {
        dispatch({
          type: actionTypes.VIEW_USER,
          user: response.data
        });
      }).catch((err) => {
        dispatch({
          type: actionTypes.USER_RETRIEVAL_FAILED,
          status: 'failed',
          error: err.message
        });
      });
  };
};