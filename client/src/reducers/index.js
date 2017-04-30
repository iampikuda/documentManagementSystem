import { combineReducers } from 'redux';
import { reducer as toastrReducer } from 'react-redux-toastr';
import loginReducer from './loginReducer';
import signupReducer from './signupReducer';
import documentReducer from './documentReducer';
import userReducer from './userReducer';
import roleReducer from './roleReducer';

const allReducers = {
  loginReducer,
  signupReducer,
  documentReducer,
  userReducer,
  roleReducer,
  toastr: toastrReducer
};

export default combineReducers(allReducers);
