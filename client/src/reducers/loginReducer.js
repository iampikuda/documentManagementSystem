import * as actionTypes from '../actions/actionTypes';

/**
 * @export
 * @param {Object} [state={}]
 * @param {Object} action
 * @returns {state} return object
 */
export default (state = {}, action) => {
  switch (action.type) {
    case actionTypes.LOGIN_SUCCESSFUL:
      return {
        ...state,
        user: action.user,
        token: action.token,
        error: null,
        success: action.message
      };
    case actionTypes.LOGIN_ERROR:
      return {
        ...state,
        error: action.message,
        success: null,
        status: 'Login failed'
      };
    default:
      return state;
  }
};
