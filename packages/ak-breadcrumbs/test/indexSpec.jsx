import chai from 'chai';
import chaiEnzyme from 'chai-enzyme';
import React, { Component } from 'react';
import { shallow } from 'enzyme';

import Breadcrumbs, { AkBreadcrumbsItem as Item } from '../src/';
import { name } from '../package.json';

const { expect } = chai;
chai.use(chaiEnzyme());


describe(name, () => {
  describe('exports', () => {
    it('the React component, and the Item component', () => {
      expect(Breadcrumbs).to.not.be.undefined;
      expect(Item).to.not.be.undefined;
      expect(new Breadcrumbs()).to.be.instanceOf(Component);
      expect(new Item()).to.be.instanceOf(Component);
    });
  });
  it('should be able to create a component', () => {
    const wrapper = shallow(<Breadcrumbs />);
    expect(wrapper).to.be.defined;
    expect(wrapper.instance()).to.be.instanceOf(Component);
  });
});
