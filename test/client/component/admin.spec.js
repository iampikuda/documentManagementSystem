import expect from 'expect';
import React from 'react';
import sinon from 'sinon';
import { shallow, mount } from 'enzyme';
import usersView from '../../../client/src/components/dashboard/adminDashboard/usersView.component';
import allRoles from '../../../client/src/components/dashboard/adminDashboard/rolesView.component';

describe('<allRoles />', () => {
  const wrapper = shallow(<allRoles />);
  it('renders all elements within it', () => {
    expect(wrapper.find('tr')).toExist();
    expect(wrapper.find('table')).toExist();
    expect(wrapper.find('td')).toExist();
  });
});
describe('<usersView />', () => {
    const wrapper = mount(<usersView />);
  it('renders all elements', () => {
    expect(wrapper.find('table')).toExist();
    expect(wrapper.find('tr')).toExist();
    expect(wrapper.find('td')).toExist();
  });
});