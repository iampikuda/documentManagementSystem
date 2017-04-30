import { combineReducers } from 'redux';
import loginReducer from './loginReducer';
import signupReducer from './signupReducer';
import documentReducer from './documentReducer';
import userReducer from './userReducer';
import roleReducer from './roleReducer';

const appReducer = combineReducers({
  loginReducer,
  signupReducer,
  documentReducer,
  userReducer,
  roleReducer
});

const initialState = appReducer({}, {});

export default (state = {}, action) => {
  if (action.type === 'CLEAR_ALL') {
    console.log('CLEAR_ALL');
    console.log('1', state);
    state = initialState;
    console.log('2', state);
    return appReducer(state, action);
  }
  console.log('3', state);
  return appReducer(state, action);
};
