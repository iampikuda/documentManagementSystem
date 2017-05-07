/* eslint-disable import/prefer-default-export */
/* eslint-disable no-undef */
import axios from 'axios';
import jwtDecode from 'jwt-decode';
import * as actionTypes from '../actionTypes';

/**
 * logout
 * @export
 * @returns {Object} returns object
 */
export default () => {
  return (dispatch) => {
    return axios.post('/api/user/logout')
    .then((response) => {
      dispatch({
        type: actionTypes.CLEAR_ALL
      });
    }).catch((err) => {
      dispatch({
        type: actionTypes.LOGOUT_FAILED,
        message: err.response.data.message
      });
    });
  };
};
