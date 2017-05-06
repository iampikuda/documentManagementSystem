import axios from 'axios';
import jwtDecode from 'jwt-decode';
import { Router } from 'react-router';
import * as actionTypes from '../actionTypes';

// export const loginSuccessful = user => ({ type: 'LOGIN_SUCCESSFUL', user });
export default (userData) => {
  userData.roleId = parseInt((userData.roleId), 10);
  return (dispatch) => {
    return axios.post('/api/user', userData)
      .then((response) => {
        window.localStorage.setItem('token', response.data.token);
        const user = jwtDecode(response.data.token);
        dispatch({
          type: actionTypes.LOGIN_SUCCESSFUL,
          user
        });
        window.location.reload();
      }).catch((error) => {
        dispatch({
          type: actionTypes.SIGNUP_FAILED,
          message: error
        });
      });
  };
};
