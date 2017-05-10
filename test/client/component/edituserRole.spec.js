// import expect from 'expect';
// import React from 'react';
// import { shallow } from 'enzyme';
// import sinon from 'sinon';
// import { EditUsersRole as EditUserRole } from '../../js/components/users/editUsersRole.component';
// import { Navbar } from '../../js/components/common/nav.component';


// describe('<EditUserRole  />', () => {
//   const wrapper = shallow(<EditUserRole />);
//   let div = wrapper.find('dashboardContainer');

//   it('renders <Navbar />', () => {
//     expect(div.find(Navbar)).toExist();
//   });

//   it('renders all elements', () => {
//     expect(div.find('form')).toExist();
//     expect(div.find('button')).toExist();
//     expect(div.find('button.updateUser')).toExist();
//   });

//   it('calls componentWillReceiveProps', () => {
//     // setup
//     sinon.spy(EditUserRole.prototype, 'componentWillReceiveProps');
//     const wrapper = shallow(<EditUserRole/>);

//     // assert
//     expect(EditUserRole.prototype.componentWillReceiveProps).toExist();

//     // action
//     EditUserRole.prototype.componentWillReceiveProps.restore();
//   });

//   describe('updateUser()', () =>{
//     it ('should update user when function is called', () => {
//       const updateUser = sinon.spy();
//       const wrapper = shallow(<EditUserRole updateUser={updateUser} />)

//       wrapper.find('button').simulate('click');
//       expect(updateUser.callCount).toEqual(1);
//     });
//   });
// });