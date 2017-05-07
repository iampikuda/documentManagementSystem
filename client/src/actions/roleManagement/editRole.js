// import axios from 'axios';
// import { browserHistory } from 'react-router';
// import * as actionTypes from '../actionTypes';

/**
 * Change role details
 * @export
 * @param {any} token
 * @param {any} roleid
 * @returns {Object} object
 */
// export default (details, token, roleid) => {
//   return (dispatch) => {
//     return axios.put(`/api/roles/${roleid}`, details, {
//       headers: {
//         Authorization: token
//       }
//     })
//     .then((res) => {
//       browserHistory.push('/app/dashboard');
//     }).catch((err) => {
//       dispatch({
//         type: actionTypes.ROLE_UPDATE_FAILED,
//         status: 'failed',
//         error: err.message
//       });
//     });
//   };
// };
