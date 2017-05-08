/* eslint-disable import/prefer-default-export */
/* eslint-disable no-undef */
import axios from 'axios';
import { browserHistory } from 'react-router';
import * as actionTypes from '../actionTypes';
import setAuthorizationToken from '../../utils/setAuth';

/**
 * searchDocuments
 * @export
 * @param {Object} query
 * @param {Object} offset
 * @returns {Object} object
 */
export default (query, offset) => {
  return (dispatch) => {
    const token = window.localStorage.getItem('token');
    setAuthorizationToken(token);
    return axios.get('/api/search/document', {
      params: {
        query,
        offset
      }
    })
    .then((documents) => {
      dispatch({
        type: actionTypes.SEARCH_DOCS_COMPLETE,
        documents,
        query,
        status: 'success',
        pageCount: documents.data.metadata.pages
      });
      Materialize.toast("Here's what we found", 2000, 'green');
    })
    .catch((err) => {
      Materialize.toast(
        'Something went wrong searching for documents',
        3000,
        'red'
        );
      dispatch({
        type: actionTypes.SEARCH_DOCS_FAILED,
        status: 'failed',
        error: err.message
      });
    });
  };
};
