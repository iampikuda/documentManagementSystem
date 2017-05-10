// import expect from 'expect';
// import React from 'react';
// import { shallow } from 'enzyme';
// import sinon from 'sinon';
// import NavBar from '../../js/components/common/nav.component';

// describe('<NavBar />', () => {
//     const wrapper = shallow(<NavBar  />);
//     // let div = wrapper.find('dashboardContainer');
//   // it('renders <Navbar />', () => {
//   //   expect(div.find(Navbar)).toExist();
//   // });
//   // it('renders all elements', () => {
//   //   expect(div.find('form')).toExist();
//   //   expect(div.find('button')).toExist();
//   //   expect(div.find('button.updateUser')).toExist();
//   // });
//   it('calls logout', () => {
//     sinon.spy(NavBar.prototype, 'logout');
//     const wrapper = mount(<NavBar />);
//     expect(NavBar.prototype.logout).toExist();
//     NavBar.prototype.logout.restore();
//   });

// });