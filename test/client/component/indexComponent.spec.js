/*import expect from 'expect';
import React from 'react';
import { shallow } from 'enzyme';
import IndexComponent from '../../../client/src/components/index.component';
import NavBar from '../../../client/src/components/commons/nav.component'
import Home from '../../../client/src/components/commons/home.component'

describe('<IndexComponent />', () => {
  const wrapper = shallow(<IndexComponent />);
  let div = wrapper.find('mainContainer');

  it('renders <NavBar />', () => {
    expect(div.find(NavBar)).toExist();
  });

  it('renders <Home />', () => {
    expect(wrapper.find(Home)).toExist();
  });

  it('renders children when passed in', () => {
    const wrapper = shallow(
      <IndexComponent>
        <div className="bg" />
      </IndexComponent>
    );
    expect(wrapper.contains(<div className="bg" />)).toBe(true);
  });
});*/