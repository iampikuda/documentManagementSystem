/*import expect from 'expect';
import React from 'react';
import { shallow } from 'enzyme';
import sinon from 'sinon';
import edituserComponent from '../../js/components/users/editUser.component';
import Navbar from '../../js/components/common/nav.component';

describe('<edituserComponent />', () => {
    const wrapper = shallow(<edituserComponent />);
    let div = wrapper.find('mainContainer').find('dashboardContainer');
  it('renders <Navbar />', () => {
    expect(div.find(Navbar)).toExist();
  });
  it('renders all elements', () => {
    expect(wrapper.find('mainContainer').find('dashboardContainer')).toExist();
    expect(wrapper.find('form')).toExist();
    expect(wrapper.find('button')).toExist();
    expect(wrapper.find('button.updateUser')).toExist();
  });
  it('renders children when passed in', () => {
    const wrapper = shallow(
      <edituserComponent>
        <div className="mainContainer" />
      </edituserComponent>
    );
    expect(wrapper.contains(<div className="mainContainer" />)).toBe(true);
  });
  it('calls componentWillReceiveProps', () => {
    sinon.spy(edituserComponent.prototype, 'componentWillReceiveProps');
    const wrapper = mount(<edituserComponent/>);
    expect(edituserComponent.prototype.componentWillReceiveProps).toExist();
    edituserComponent.prototype.componentWillReceiveProps.restore();
  });
});*/