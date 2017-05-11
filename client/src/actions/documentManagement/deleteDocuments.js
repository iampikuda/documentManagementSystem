/* eslint-disable import/prefer-default-export */
/* eslint-disable no-undef */
import axios from 'axios';
import { browserHistory } from 'react-router';
import * as actionTypes from '../actionTypes';
import setAuthorizationToken from '../../utils/setAuth';

/**
 * documentDeleted
 * @export
 * @param {Object} documentId
 * @returns {Object} object
 */
export default (documentId) => {
  const token = window.localStorage.getItem('token');
  return (dispatch) => {
    setAuthorizationToken(token);
    return axios.delete(`/api/document/${documentId}`)
    .then((document) => {
      const data = document.data.Document
      console.log(data);
      dispatch({
        type: actionTypes.DOCUMENT_DELETED,
        status: 'success',
        data
      });

    }).catch((err) => {
      Materialize.toast(err, 3000, 'red');
      dispatch({
        type: actionTypes.DOCUMENT_DELETION_FAILED,
        status: 'failed',
        error: err.message
      });
    });
  };
};
