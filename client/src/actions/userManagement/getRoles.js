import axios from 'axios';
import { browserHistory } from 'react-router';
import * as actionTypes from '../actionTypes';

const roleGetSuccess = (roles) => {
  return {
    type: actionTypes.GET_ROLE_SUCCESS,
    roles
  };
};

export const viewRoles = (userId) => {
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
    .catch((err) => {
      dispatch({
        type: actionTypes.GET_ROLE_FAILED,
        status: 'failed',
        error: err.message
      });
    });
  };
};
