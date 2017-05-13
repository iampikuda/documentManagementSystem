import expect from 'expect';
import React from 'react';
import { shallow } from 'enzyme';
import sinon from 'sinon';
import CreateDocument from '../../../client/src/components/modals/createDocForm.component.jsx';
import AddDoc from '../../../client/src/components/modals/addDoc.component.jsx';


describe('<AddDoc />', () => {
    const wrapper = shallow(<AddDoc />);
    let div = wrapper.find('nmodal').find('createDocModal');
  it('renders <CreateDocument />', () => {
    expect(div.find(CreateDocument)).toExist();
  });
  it('renders all elements', () => {
    expect(wrapper.find('div').length).toExist();
    expect(wrapper.find('Link')).toExist();
    expect(div.find('h4')).toExist();
  });
});