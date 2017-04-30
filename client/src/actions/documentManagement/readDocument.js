import axios from 'axios';
import { browserHistory } from 'react-router';
import * as actionTypes from '../actionTypes';
import setAuthorizationToken from '../../utils/setAuth';

const documentReadSuccess = (documents) => {
  return {
    type: actionTypes.VIEW_USER_DOCUMENTS_SUCCESS,
    documents
  };
};

export const viewUserDocuments = (userId) => {
  return (dispatch) => {
    const token = window.localStorage.getItem('token');
    setAuthorizationToken(token);
    axios.get('/api/document')
    .then((documents) => {
      dispatch(documentReadSuccess(documents));
    })
    .catch((err) => {
    });
  };
};
