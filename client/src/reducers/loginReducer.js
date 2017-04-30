export default (state = {}, action) => {
  switch (action.type) {
    case 'LOGIN_SUCCESSFUL':
      return {
        ...state,
        user: action.user,
        token: action.token,
        error: null,
        success: action.message
      };
    case 'LOGIN_ERROR':
      console.log('=-=-[=-]-=0=-0=-0989879', action.message);
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
