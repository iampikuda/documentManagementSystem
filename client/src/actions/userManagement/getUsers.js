import axios from 'axios';
import { browserHistory } from 'react-router';
import * as actionTypes from '../actionTypes';
import setAuthorizationToken from '../../utils/setAuth';

const userGetSuccess = (users) => {
  return {
    type: actionTypes.GET_USER_SUCCESS,
    users,
    pageCount: users.data.metadata.pages

  };
};

export const viewUsers = (offset) => {
  return (dispatch) => {
    const token = window.localStorage.getItem('token');
    setAuthorizationToken(token);
    axios.get('/api/user', {
      params: {
        offset
      }
    })
    .then((users) => {
      dispatch(userGetSuccess(users));
    })
    .catch((err) => {
    });
  };
};
