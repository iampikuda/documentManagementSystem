import axios from 'axios';
import * as actionTypes from '../actionTypes';

export default (userData, userId) => {
  const token = window.localStorage.getItem('token');
  return (dispatch) => {
    return axios.put(`/api/user/${userId}`, userData, {
      headers: {
        Authorization: token
      }
    })
      .then((res) => {
        dispatch({
          type: actionTypes.USER_UPDATED,
          user: Object.assign({}, userData, {
            id: userId
          })
        });
      }).catch((err) => {
        dispatch({
          type: actionTypes.USER_UPDATE_FAILED,
          status: 'failed',
          error: err.message
        });
      });
  };
};
