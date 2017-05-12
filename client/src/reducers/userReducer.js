import * as actionTypes from '../actions/actionTypes';

/**
 * @export
 * @param {Object} [state={}]
 * @param {Object} action
 * @returns {state} return object
 */
export default (state = {}, action) => {
  switch (action.type) {
    case actionTypes.GET_USER_SUCCESS:
      return {
        ...state,
        users: action.data,
        pageCount: action.pageCount
      };
    case actionTypes.USER_DELETED:
      console.log(action.data);
      let deletedUser = action.data;
      let data = state.users.filter(user => (parseInt(user.id, 10) !== parseInt(deletedUser.id,10)));
      return Object.assign({}, state, {
        ...state,
        users: data
      });
    case actionTypes.VIEW_USER:
      return {
        ...state,
        viewUser: action.data,
      };
    case actionTypes.SEARCH_USER_COMPLETE:
      return {
        ...state,
        search: action.data,
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
