import expect from 'expect';
import React from 'react';
import { shallow, mount } from 'enzyme';
import signUpPage from '../../../client/src/components/authPages/signUpPage.jsx';
import renderer from 'react-test-renderer'
import sinon from 'sinon';

function setup() {
  const props = {
    errors: {},
    userProps: {},
    onSubmit: () => {},
    onChange: () => {}
  };

  return mount(<signUpPage {...props} />);
}

describe('Signup page', () => {
  it('should take props', () => {
    const wrapper = setup();
    expect(wrapper.props().errors).toExist;
    expect(wrapper.props().userProps).toExist;
    expect(wrapper.props().onChange).toExist;
    expect(wrapper.props().onSubmit).toExist;
  });
});
describe ('Signup component', () => {
  let signup = sinon.spy();

  const wrapper = mount(
    <signUpPage signup={signup} />
  )
  const signupDiv = wrapper.find('signupForm')

  it('loads the signup form', () => {
    expect(signupDiv.find('form')).toExist()
  });
});