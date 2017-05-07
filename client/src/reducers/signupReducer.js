import * as actionTypes from '../actions/actionTypes';

/**
 * @export
 * @param {any} [state={}]
 * @param {any} action
 * @returns {state} return object
 */
export default (state = {}, action) => {
  switch (action.type) {
    case actionTypes.LOGIN_SUCCESSFUL:
      return {
        ...state,
        user: Object.assign({}, action.user)
      };
    case actionTypes.SIGNUP_FAILED:
      return {
        ...state,
        error: action.message,
        success: null
      };
    default:
      return state;
  }
};
