import * as actionTypes from '../actions/actionTypes';

/**
 * @export
 * @param {Object} [state={}]
 * @param {Object} action
 * @returns {state} return object
 */
export default (state = {}, action) => {
  switch (action.type) {
    case actionTypes.GET_ROLE_SUCCESS:
      return { ...state, roles: action.data };
    case actionTypes.GET_ROLE_FAILED:
      return { ...state, status: action.status };
    case actionTypes.ADD_ROLE_SUCCESS:
      return { ...state, createStatus: action.status, roles: action.roles };
    default:
      return state;
  }
};
