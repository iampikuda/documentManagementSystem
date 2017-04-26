/* eslint-disable import/prefer-default-export */
/* eslint-disable no-undef */
import axios from 'axios';
import jwtDecode from 'jwt-decode';

export default (credentials) => {
  return (dispatch) => {
    return axios.post('/api/user/logout', credentials)
    .then((response) => {
      dispatch({
        type: 'CLEAR_ALL'
      });
      window.location = '/';
    });
  };
};
