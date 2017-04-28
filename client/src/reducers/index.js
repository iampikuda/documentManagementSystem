import { combineReducers } from 'redux';
import loginReducer from './loginReducer';
import signupReducer from './signupReducer';
import documentReducer from './documentReducer';
import userReducer from './userReducer';
import roleReducer from './roleReducer';

export default combineReducers({
  loginReducer,
  signupReducer,
  documentReducer,
  userReducer,
  roleReducer
});
