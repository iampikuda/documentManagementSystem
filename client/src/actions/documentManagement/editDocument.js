import axios from 'axios';
import { browserHistory } from 'react-router';
import * as actionTypes from '../actionTypes';

/**
 * Edit documents
 * @export
 * @param {any} details
 * @param {any} documentId
 * @returns {object} object
 */
export default (details, documentId) => {
  return (dispatch) => {
    const token = window.localStorage.getItem('token');
    if (!token) {
      return;
    }
    return axios.put(`/api/document/${documentId}`, details, {
      headers: {
        Authorization: token
      }
    })
    .then(() => {
      window.location.reload();
    }).catch((err) => {
      dispatch({
        type: actionTypes.DOCUMENT_UPDATE_FAILED,
        status: 'failed',
        error: err.message
      });
    });
  };
};
