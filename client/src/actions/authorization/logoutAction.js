/* eslint-disable import/prefer-default-export */
/* eslint-disable no-undef */
import axios from 'axios';
import jwtDecode from 'jwt-decode';
import * as actionTypes from '../actionTypes';

export default (credentials) => {
  return (dispatch) => {
    return axios.post('/api/user/logout', credentials)
    .then((response) => {
      dispatch({
        type: actionTypes.CLEAR_ALL
      });
      // window.location = '/';
    }).catch((err) => {
      dispatch({
        type: actionTypes.LOGOUT_FAILED,
        message: err.response.data.message
      });
    });
  };
};
