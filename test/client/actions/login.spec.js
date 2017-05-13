import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import expect from 'expect';
import nock from 'nock';
import loginAuth from '../../../client/src/actions/authorization/loginAction';
import * as types from '../../../client/src/actions/actionTypes';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('Login Action', () => {
  it('creates LOGIN_SUCCESSFUL when login has been done',
    () => {
      const user = { userName: 'user', password: 'password' };

      const expectedActions = [
        { type: types.LOGIN_SUCCESSFUL,
          user,
          token: 'tokenize',
          message: 'Login Successful'
        }];

      const store = mockStore({ loginReducer: {} });

      store.dispatch(loginAuth(user))
        .then((res) => {
          expect(store.getActions()).toEqual(expectedActions);
        });
    });
});