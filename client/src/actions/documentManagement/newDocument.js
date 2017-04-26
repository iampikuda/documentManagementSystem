import axios from 'axios';
import { browserHistory } from 'react-router';
import * as actionTypes from '../actionTypes';

export default (details) => {
  const token = window.localStorage.getItem('token');
  return (dispatch) => {
    return axios.post('/api/document', details, {
      headers: {
        Authorization: token
      }
    })
      .then(() => {
        dispatch({
          type: actionTypes.DOCUMENT_CREATED,
          document,
          status: 'success'
        });
        browserHistory.push('/app/dashboard');
      }).catch((err) => {
        dispatch({
          type: actionTypes.DOCUMENT_CREATE_FAILED,
          document,
          status: 'failed',
          error: err.message
        });
      });
  };
};