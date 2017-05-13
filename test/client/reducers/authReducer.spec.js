import expect from 'expect';
import * as actionTypes from '../../../client/src/actions/actionTypes';
import loginReducer from '../../../client/src/reducers/loginReducer';
import signupReducer from '../../../client/src/reducers/signupReducer';

describe('login reducer', ()=> {
  const initialState = {
    isAuthenticated: false,
  }
  it('should return the initial state', () => {
    expect(
      loginReducer(undefined, {})
    ).toEqual(
      {}
    )
  });

  it('should handle LOGIN_SUCCESSFUL', () => {
    expect(
      loginReducer({
        userName: "Del",
        password: 12345
      }, actionTypes.LOGIN_SUCCESSFUL)
    ).toEqual(
    {
     "password": 12345,
      "userName": "Del"})
  });
});

describe('signup reducer', ()=> {
  it('should return the initial state', () => {
    expect(
      signupReducer(undefined, {})
    ).toEqual(
      {}
    )
  })
});