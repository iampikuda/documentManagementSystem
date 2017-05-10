/*import expect from 'expect';
import React from 'react';
import { shallow } from 'enzyme';
import indexComponent from '../../js/components/index.component';
import renderer from 'react-test-renderer'
import Navbar from '../../js/components/common/nav.component'
import Body from '../../js/components/body.component'

describe('<indexComponent />', () => {
  const wrapper = shallow(<indexComponent />);
  let div = wrapper.find('mainContainer');

  it('renders <Navbar />', () => {
    expect(div.find(Navbar)).toExist();
  });

  it('renders <Body />', () => {
    expect(wrapper.find(Body)).toExist();
  });

  it('renders children when passed in', () => {
    const wrapper = shallow(
      <indexComponent>
        <div className="mainContainer" />
      </indexComponent>
    );
    expect(wrapper.contains(<div className="mainContainer" />)).toBe(true);
  });
});*/