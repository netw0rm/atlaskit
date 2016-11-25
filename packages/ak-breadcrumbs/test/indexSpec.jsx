import chai from 'chai';
import chaiEnzyme from 'chai-enzyme';
import React, { Component } from 'react';
import { shallow } from 'enzyme';

import Breadcrumbs, { AkBreadcrumbsItem as Item } from '../src/';
import styles from '../src/styles.less';
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

  describe('construction', () => {
    it('should be able to create a component', () => {
      const wrapper = shallow(<Breadcrumbs />);
      expect(wrapper).to.be.defined;
      expect(wrapper.instance()).to.be.instanceOf(Component);
    });

    it('should render all children inside a container div', () => {
      const wrapper = shallow(
        <Breadcrumbs>
          <Item>item</Item>
          <Item>item</Item>
          <Item>item</Item>
        </Breadcrumbs>
      );
      const containerDiv = wrapper.find(`.${styles.locals.container}`);
      expect(containerDiv).to.have.lengthOf(1);
      expect(containerDiv.find(Item)).to.have.lengthOf(3);
    });
  });
});
