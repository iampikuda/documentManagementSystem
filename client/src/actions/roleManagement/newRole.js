import axios from 'axios';
import { browserHistory } from 'react-router';
import * as actionTypes from '../actionTypes';

/**
 * Create role
 * @export
 * @param {any} details
 * @returns {Object} return object
 */
export default (details) => {
  const token = window.localStorage.getItem('token');
  return (dispatch) => {
    return axios.post('/api/role', details, {
      headers: {
        Authorization: token
      }
    })
      .then((role) => {
        dispatch({
          type: actionTypes.ROLE_CREATED,
          role,
          status: 'success'
        });
        browserHistory.push('/dasboard');
      }).catch((err) => {
        dispatch({
          type: actionTypes.ROLE_CREATE_FAILED,
          status: 'failed',
          error: err.message
        });
      });
  };
};
