/* eslint-disable import/prefer-default-export */
/* eslint-disable no-undef */
import axios from 'axios';
import { browserHistory } from 'react-router';
import * as actionTypes from '../actionTypes';
import setAuthorizationToken from '../../utils/setAuth';

/**
 * Edit documents
 * @export
 * @param {Object} details
 * @param {Object} documentId
 * @returns {object} object
 */
export default (details, documentId) => {
  return (dispatch) => {
    const token = window.localStorage.getItem('token');
    setAuthorizationToken(token);
    if (!token) {
      return;
    }
    return axios.put(`/api/document/${documentId}`, details)
    .then((document) => {
      dispatch({
        type: actionTypes.DOCUMENT_CREATED,
        document,
        status: 'success'
      });
      Materialize.toast('Document updated', 3000, 'green');
    }).catch((err) => {
      Materialize.toast(
          'Title already exists! Please choose another',
          3000, 'red');
      dispatch({
        type: actionTypes.DOCUMENT_UPDATE_FAILED,
        status: 'failed',
        error: err.message
      });
    });
  };
};
