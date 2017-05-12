/*import expect from 'expect';
import React from 'react';
import { shallow, mount } from 'enzyme';
import sinon from 'sinon';
import EditUserComponent from '../../../client/src/components/userPages/editUser.component.jsx';
import NavBar from '../../../client/src/components/commons/nav.component';
import * as initial from '../../../client/src/reducers/index';
import initialDefault from '../../../client/src/reducers/index';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);
describe('<EditUserComponent />', () => {
  const wrapper = mount(<EditUserComponent store={mockStore()}/>);
  let div = wrapper.find('mainContainer').find('dashboardContainer');
  it('renders <NavBar />', () => {
    expect(div.find(NavBar)).toExist();
  });
  it('renders all elements', () => {
    expect(wrapper.find('mainContainer').find('dashboardContainer')).toExist();
    expect(wrapper.find('form')).toExist();
    expect(wrapper.find('button')).toExist();
    expect(wrapper.find('button.updateUser')).toExist();
  });
  it('renders children when passed in', () => {
    const wrapper = shallow(
      <EditUserComponent>
        <div className="mainContainer" />
      </EditUserComponent>
    );
    expect(wrapper.contains(<div className="mainContainer" />)).toBe(true);
  });
  it('calls componentWillReceiveProps', () => {
    sinon.spy(EditUserComponent.prototype, 'componentWillReceiveProps');
    const wrapper = mount(<EditUserComponent/>);
    expect(EditUserComponent.prototype.componentWillReceiveProps).toExist();
    EditUserComponent.prototype.componentWillReceiveProps.restore();
  });
});*/