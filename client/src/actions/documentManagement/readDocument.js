/* eslint-disable import/prefer-default-export */
/* eslint-disable no-undef */
import axios from 'axios';
import { browserHistory } from 'react-router';
import * as actionTypes from '../actionTypes';
import setAuthorizationToken from '../../utils/setAuth';

const documentReadSuccess = (documents) => {
  let data = [];
  if(documents.data.documents === undefined) {
    data = documents.data.document
  } else {
    data = documents.data.documents;
  }
  return {
    type: actionTypes.GET_ALL_DOCUMENTS,
    data,
    pageCount: documents.data.metadata.pages
  };
};

export const viewUserDocuments = (offset) => {
  return (dispatch) => {
    const token = window.localStorage.getItem('token');
    setAuthorizationToken(token);
    axios.get('/api/document', {
      params: {
        offset
      }
    })
    .then((documents) => {
      dispatch(documentReadSuccess(documents));
    })
    .catch((err) => {
      dispatch({
        type: 'READ_DOCS_FAILED',
        status: 'failed',
        error: err.message
      });
    });
  };
};
