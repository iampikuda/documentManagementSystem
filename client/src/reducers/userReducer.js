import * as actionTypes from '../actions/actionTypes';

export default (state = {}, action) => {
  switch (action.type) {
    case actionTypes.GET_USER_SUCCESS:
      return { ...state, users: action.users };
    case actionTypes.SEARCH_USER_COMPLETE:
      return { ...state, search: action.users, status: action.status };
    case actionTypes.SEARCH_USER_FAILED:
      return { ...state, status: action.status };
    default:
      return state;
  }
};
