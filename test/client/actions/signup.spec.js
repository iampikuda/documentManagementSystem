import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import expect from 'expect';
import nock from 'nock';
import signupAuth from '../../../client/src/actions/authorization/signupAction';
import * as types from '../../../client/src/actions/actionTypes';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('Signup Action', () => {
  it('creates LOGIN_SUCCESSFUL when signup has been done',
    () => {
      const user = {
        firstName: 'firstname',
        lastName: 'lastname',
        userName: 'username',
        email: 'email',
        password: 'password'
         };

      const expectedActions = [
        { type: types.LOGIN_SUCCESSFUL,
          user,
        }];

      const store = mockStore({ signupReducer: {} });

      store.dispatch(signupAuth(user))
        .then((res) => {
          expect(store.getActions()).toEqual(expectedActions);
        });
    });
});