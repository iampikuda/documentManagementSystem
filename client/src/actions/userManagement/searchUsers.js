import axios from 'axios';
import { browserHistory } from 'react-router';
import * as actionTypes from '../actionTypes';
import setAuthorizationToken from '../../utils/setAuth';

export default (details, offset) => {
  return (dispatch) => {
    const token = window.localStorage.getItem('token');
    setAuthorizationToken(token);
    return axios.get('/api/search/user', {
      params: {
        query: details,
        offset
      }
    })
    .then((users) => {
      dispatch({
        type: actionTypes.SEARCH_USER_COMPLETE,
        users,
        status: 'success'
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
