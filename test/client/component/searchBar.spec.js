// import expect from 'expect';
// import React from 'react';
// import { shallow } from 'enzyme';
// import sinon from 'sinon';
// import subNavBar from '../../../client/src/components/commons/subNavBar.jsx';
// import AddDoc from '../../../client/src/components/modals/addDoc.component.jsx';


// describe('<subNavBar />', () => {
//     const wrapper = shallow(<subNavBar />);
//     let div = wrapper.find('nav').find('nav-wrapper');
//   it('renders <AddDoc />', () => {
//     expect(div.find(AddDoc)).toExist();
//   });
//   it('renders all elements', () => {
//     expect(wrapper.find('form')).toExist();
//     expect(wrapper.find('button')).toExist();
//     expect(wrapper.find('select')).toExist();
//   });
//   it('calls componentDidMount', () => {
//     sinon.spy(subNavBar.prototype, 'componentDidMount');
//     const wrapper = mount(<subNavBar/>);
//     expect(subNavBar.prototype.componentDidMount).toExist();
//     subNavBar.prototype.componentDidMount.restore();
//   });
// });