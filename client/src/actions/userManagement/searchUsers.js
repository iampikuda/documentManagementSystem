import axios from 'axios';
import { browserHistory } from 'react-router';
import * as actionTypes from '../actionTypes';
import setAuthorizationToken from '../../utils/setAuth';

/**
 * searchUsers
 * @export
 * @param {any} query
 * @param {any} offset
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
      dispatch({
        type: actionTypes.SEARCH_USER_COMPLETE,
        users,
        query,
        status: 'success',
        pageCount: users.data.metadata.pages
      });
    })
    .catch((err) => {
      dispatch({
        type: actionTypes.SEARCH_USER_FAILED,
        status: 'failed',
        error: err.message
      });
    });
  };
};
