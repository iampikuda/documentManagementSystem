import axios from 'axios';
import { browserHistory } from 'react-router';
import * as actionTypes from '../actionTypes';
import setAuthorizationToken from '../../utils/setAuth';

const documentReadSuccess = (documents) => {
  return {
    type: actionTypes.VIEW_USER_DOCUMENTS_SUCCESS,
    documents,
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
      console.log(documents);
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
