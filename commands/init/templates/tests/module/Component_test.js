import React from 'react';
import {shallow} from 'enzyme';
import Component from '../../src/module/Component';

describe('a test', () => {

  it(`hello world in a h1`, () => {
    const wrapper = shallow(<Component />);
    const h1 = wrapper.find('h1');
    expect(h1.text()).toBe('Hello world');
  });

});
