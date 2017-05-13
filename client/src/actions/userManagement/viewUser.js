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
      .then((user) => {
        dispatch({
          type: actionTypes.VIEW_USER,
          data: user.data
        });
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
          type: actionTypes.USER_RETRIEVAL_FAILED,
          status: 'failed',
          error: error.message
        });
      });
  };
};