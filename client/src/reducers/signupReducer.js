export default (state = {}, action) => {
  switch (action.type) {
    case 'LOGIN_SUCCESSFUL':
      return { ...state, user: Object.assign({}, action.user) };
    case 'SIGNUP_FAILED':
      return { ...state, error: action.message, success: null };
    default:
      return state;
  }
};
