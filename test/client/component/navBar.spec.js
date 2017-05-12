// import expect from 'expect';
// import React from 'react';
// import { shallow } from 'enzyme';
// import { Provider } from 'react-redux';
// import thunk from 'redux-thunk';
// import sinon from 'sinon';
// import NavBar from '../../../client/src/components/commons/nav.component.js';
// import configureMockStore from 'redux-mock-store';

// const middlewares = [thunk];
// const mockStore = configureMockStore(middlewares);
// describe('<NavBar />', () => {
//     const wrapper = shallow(<NavBar store={mockStore()} />);
//     let div = wrapper.find('dashboardContainer');
//   it('renders <NavBar />', () => {
//     expect(div.find(NavBar)).toExist();
//   });
//   it('renders all elements', () => {
//     expect(div.find('form')).toExist();
//     expect(div.find('button')).toExist();
//     expect(div.find('button.updateUser')).toExist();
//   });
//   // it('calls logout', () => {
//   //   console.log(NavBar.prototype, '-0=-=-=-');
//   //   const logoutSpy = sinon.spy(NavBar.prototype, 'logout');
//   //   const wrapper = mount(
//   //     // <Provider store={mockStore()}>
//   //       <NavBar store={mockStore()} />
//   //     // </Provider>
//   //   );
//   //   expect(logoutSpy).toExist();
//   //   NavBar.prototype.logout.restore();
//   // });

// });