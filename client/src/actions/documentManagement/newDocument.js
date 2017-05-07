import axios from 'axios';
import { browserHistory } from 'react-router';
import * as actionTypes from '../actionTypes';
import setAuthorizationToken from '../../utils/setAuth';

/**
 * Add new Document
 * @export
 * @param {Object} details
 * @returns {Object} return object
 */
export default (details) => {
  const token = window.localStorage.getItem('token');
  return (dispatch) => {
    setAuthorizationToken(token);
    return axios.post('/api/document', details)
      .then((document) => {
        dispatch({
          type: actionTypes.DOCUMENT_CREATED,
          document,
          status: 'success'
        });
        window.location.reload();
      }).catch((err) => {
        dispatch({
          type: actionTypes.DOCUMENT_CREATE_FAILED,
          status: 'failed',
          error: err.message
        });
      });
  };
};
