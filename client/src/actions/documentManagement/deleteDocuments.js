import axios from 'axios';
import { browserHistory } from 'react-router';

export default (documentid) => {
  const token = window.localStorage.getItem('token');
  return (dispatch) => {
    return axios.delete(`/documents/${documentid}`, {
      headers: {
        authorization: token
      }
    })
    .then(() => {
      dispatch({
        type: 'DOCUMENT_DELETED',
        status: 'success'
      });
      browserHistory.push('/');
    }).catch((err) => {
      dispatch({
        type: 'DOCUMENT_DELETION_FAILED',
        status: 'failed',
        error: err.message
      });
    });
  };
};