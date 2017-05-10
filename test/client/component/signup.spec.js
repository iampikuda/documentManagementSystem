// import expect from 'expect';
// import React from 'react';
// import { shallow } from 'enzyme';
// import { Signup } from '../../js/components/signup.component';
// import renderer from 'react-test-renderer'
// import sinon from 'sinon';

// describe ('Signup component', () => {
//   let signup = sinon.spy();

//   const wrapper = mount(
//     <Signup signup={signup} />
//   )
//   const signupDiv = wrapper.find('signupForm')

//   it('loads the signup form', () => {
//     expect(signupDiv.find('form')).toExist()
//   });

//   describe('onSubmit()', () => {
//     let e = { preventDefault: () => {} };
//     let toast;

//     beforeEach(() => {
//       toast = sinon.spy(Materialize, 'toast');
//     })

//     afterEach(() => {
//       toast.restore();
//     })

//     it('shows a toast error if passwords do not match', () => {
//       wrapper.instance().state.password = '1';
//       wrapper.instance().state.confirmPassword = '0';
//       wrapper.instance().onSubmit(e);

//       expect(signup.callCount).toEqual(0);
//       expect(toast.callCount).toEqual(1);
//       expect(toast.firstCall.args).toEqual(['Passwords don\'t match!', 3000])
//     });

//     it('calls the signup function with the instance state if data is valid', () => {
//       wrapper.instance().state.password = '1';
//       wrapper.instance().state.confirmPassword = '1';
//       let state = wrapper.instance().state;
//       wrapper.instance().onSubmit(e);

//       expect(signup.callCount).toEqual(1);
//       expect(signup.firstCall.args).toEqual([state])
//     })
//   });
// });