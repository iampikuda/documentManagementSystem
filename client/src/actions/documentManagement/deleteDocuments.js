import axios from 'axios';
import { browserHistory } from 'react-router';
import * as actionTypes from '../actionTypes';

/**
 * documentDeleted
 * @export
 * @param {any} documentId
 * @returns {Object} object
 */
export default (documentId) => {
  const token = window.localStorage.getItem('token');
  return (dispatch) => {
    return axios.delete(`/api/document/${documentId}`, {
      headers: {
        authorization: token
      }
    })
    .then(() => {
      dispatch({
        type: actionTypes.DOCUMENT_DELETED,
        status: 'success'
      });
      window.location.reload();
    }).catch((err) => {
      dispatch({
        type: actionTypes.DOCUMENT_DELETION_FAILED,
        status: 'failed',
        error: err.message
      });
    });
  };
};
