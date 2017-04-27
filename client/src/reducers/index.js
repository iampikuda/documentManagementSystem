import { combineReducers } from 'redux';
import loginReducer from './loginReducer';
import signupReducer from './signupReducer';
import documentReducer from './documentReducer';
import userReducer from './userReducer';

export default combineReducers({
  loginReducer,
  signupReducer,
  documentReducer,
  userReducer
});
