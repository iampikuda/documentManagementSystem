/* eslint-disable import/prefer-default-export */
/* eslint-disable no-undef */
import axios from 'axios';
import { browserHistory } from 'react-router';
import * as actionTypes from '../actionTypes';

/**
 * Create role
 * @export
 * @param {Object} details
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
        Materialize.toast(
          'Role created',
          3000,
          'green'
          );
      }).catch((err) => {
        Materialize.toast(
          'Something went wrong creating a new role',
          3000,
          'red'
          );
        dispatch({
          type: actionTypes.ROLE_CREATE_FAILED,
          status: 'failed',
          error: err.message
        });
      });
  };
};
