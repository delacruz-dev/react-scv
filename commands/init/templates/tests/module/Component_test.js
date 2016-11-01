import React from 'react';
import chai from 'chai';
import chaiEnzyme from 'chai-enzyme';
import { shallow } from 'enzyme';
import Component from '../../src/module/Component';

const expect = chai.expect;

chai.use(chaiEnzyme());

describe('a test', () => {

  it(`hello world in a h1`, () => {
    const wrapper = shallow(<Component />);
    const h1 = wrapper.find('h1');

    expect(h1).to.have.length(1);
    expect(h1.text()).to.equal('Hello world');
  });

});
