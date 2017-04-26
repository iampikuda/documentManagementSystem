import { combineReducers } from 'redux';
import loginReducer from './loginReducer';
import signupReducer from './signupReducer';
import documentReducer from './documentReducer';

export default combineReducers({
  loginReducer,
  signupReducer,
  documentReducer
});
