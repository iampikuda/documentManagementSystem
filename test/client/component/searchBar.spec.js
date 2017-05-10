// import expect from 'expect';
// import React from 'react';
// import { shallow } from 'enzyme';
// import sinon from 'sinon';
// import searchBar from '../../js/components/common/searchbar.component';
// import AddDoc from '../../js/components/docs/adddoc.component';


// describe('<searchBar />', () => {
//     const wrapper = shallow(<searchBar />);
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
//     sinon.spy(searchBar.prototype, 'componentDidMount');
//     const wrapper = mount(<searchBar/>);
//     expect(searchBar.prototype.componentDidMount).toExist();
//     searchBar.prototype.componentDidMount.restore();
//   });
// });