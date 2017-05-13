/* eslint-disable import/prefer-default-export */
/* eslint-disable no-undef */
import axios from 'axios';
import { browserHistory } from 'react-router';
import * as actionTypes from '../actionTypes';
import setAuthorizationToken from '../../utils/setAuth';

/**
 * searchUsers
 * @export
 * @param {Object} query
 * @param {Object} offset
 * @returns {Object} object
 */
export default (query, offset) => {
  return (dispatch) => {
    const token = window.localStorage.getItem('token');
    setAuthorizationToken(token);
    return axios.get('/api/search/user', {
      params: {
        query,
        offset
      }
    })
    .then((users) => {
      const data = users.data.users;
      dispatch({
        type: actionTypes.SEARCH_USER_COMPLETE,
        data,
        query,
        status: 'success',
        pageCount: users.data.metadata.pages
      });
     Materialize.toast("Here's who we found", 2000, 'green');
    })
    .catch((error) => {
      let errorData;
        if(error.response.data.errors !== undefined) {
          errorData = error.response.data.errors[0].message
        } else {
          errorData = error.response.data.message
        }
        Materialize.toast(
          errorData, 3000, 'red');
      dispatch({
        type: actionTypes.SEARCH_USER_FAILED,
        status: 'failed',
        error: error.message
      });
    });
  };
};
