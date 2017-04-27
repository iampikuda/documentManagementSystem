import axios from 'axios';
import { browserHistory } from 'react-router';
import * as actionTypes from '../actionTypes';

const documentReadSuccess = (documents) => {
  return {
    type: actionTypes.VIEW_USER_DOCUMENTS_SUCCESS,
    documents
  };
};

export const viewUserDocuments = (userId) => {
  return (dispatch) => {
    const token = window.localStorage.getItem('token');
    axios.get('/api/document', {
      headers: {
        Authorization: token
      }
    })
    .then((documents) => {
      dispatch(documentReadSuccess(documents));
    })
    .catch((err) => {
    });
  };
};
