import * as actionTypes from '../actions/actionTypes';

/**
 * @export
 * @param {any} [state={}]
 * @param {any} action
 * @returns {state} return object
 */
export default (state = {}, action) => {
  switch (action.type) {
    case actionTypes.GET_USER_SUCCESS:
      return { ...state, users: action.users, pageCount: action.pageCount };
    case actionTypes.SEARCH_USER_COMPLETE:
      return {
        ...state,
        search: action.users,
        status: action.status,
        searchPageCount: action.pageCount,
        query: action.query
      };
    case actionTypes.SEARCH_USER_FAILED:
      return { ...state, status: action.status };
    default:
      return state;
  }
};
