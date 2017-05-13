/* eslint-disable import/prefer-default-export */
/* eslint-disable no-undef */
import axios from 'axios';
import { browserHistory } from 'react-router';
import * as actionTypes from '../actionTypes';


/**
 * Set action type
 * @param {Object} roles
 * @returns {Object} return object
 */
const roleGetSuccess = (roles) => {
  const data = roles.data.roles;
  return {
    type: actionTypes.GET_ROLE_SUCCESS,
    data
  };
};

/**
 * View roles
 * @export
 * @param {Object} userId
 * @returns {function} function
 */
export const viewRoles = (userId) => {// eslint-disable-line
  return (dispatch) => {
    const token = window.localStorage.getItem('token');
    axios.get('/api/role', {
      headers: {
        Authorization: token
      }
    })
    .then((roles) => {
      dispatch(roleGetSuccess(roles));
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
        type: actionTypes.GET_ROLE_FAILED,
        status: 'failed',
        error: error.message
      });
    });
  };
};
