import chai from 'chai';
import chaiEnzyme from 'chai-enzyme';
import React, { Component } from 'react';
import { mount, shallow } from 'enzyme';
import Button from 'ak-button';
import AtlassianIcon from 'ak-icon/glyph/atlassian';

import Item from '../src/BreadcrumbsItem';
import { itemTruncateWidth } from '../src/internal/constants';
import { name } from '../package.json';
import { setItemWidth } from './_helpers';

const { expect } = chai;
chai.use(chaiEnzyme());

describe(name, () => {
  describe('BreadcrumbsItem', () => {
    describe('exports', () => {
      it('the BreadcrumbsItem component', () => {
        expect(Item).to.exist;
        expect(new Item()).to.be.instanceOf(Component);
      });
    });

    describe('construction', () => {
      it('should be able to create a component', () => {
        const wrapper = shallow(<Item />);
        expect(wrapper).to.be.defined;
        expect(wrapper.instance()).to.be.instanceOf(Component);
      });

      it('should set the initial state correctly', () => {
        const wrapper = shallow(<Item />);
        expect(wrapper.state().hasOverflow).to.equal(false);
      });

      it('should render a link Button containing the content', () => {
        const text = 'text';
        const wrapper = mount(<Item text={text} />);
        expect(wrapper.find(Button)).to.have.text(text);
      });
    });

    describe('props', () => {
      describe('item prop', () => {
        it('should be reflected to the Button content', () => {
          const text = 'text';
          const wrapper = mount(<Item text={text} />);
          expect(wrapper.find(Button)).to.have.text(text);
        });
      });
      describe('href prop', () => {
        it('should be reflected to the Button', () => {
          const href = '/my/href/';
          const wrapper = mount(<Item href={href} />);
          expect(wrapper.find(Button)).to.have.prop('href', href);
        });
        describe('iconAfter prop', () => {
          it('should be reflected to the Button', () => {
            const icon = <AtlassianIcon label="icon" />;
            const wrapper = shallow(<Item iconAfter={icon} />);
            expect(wrapper.find(Button)).to.have.prop('iconAfter', icon);
          });
        });
        describe('iconBefore prop', () => {
          it('should be reflected to the Button', () => {
            const icon = <AtlassianIcon label="icon" />;
            const wrapper = shallow(<Item iconBefore={icon} />);
            expect(wrapper.find(Button)).to.have.prop('iconBefore', icon);
          });
        });
      });
    });

    describe('overflow calculation', () => {
      let item;

      beforeEach(() => {
        const wrapper = mount(<Item>content</Item>);
        item = wrapper.instance();
      });

      it('for an item which is truncated', () => {
        setItemWidth(item, itemTruncateWidth);
        expect(item.updateOverflow()).to.equal(true);
      });

      it('for an item which is not truncated', () => {
        setItemWidth(item, itemTruncateWidth - 1);
        expect(item.updateOverflow()).to.equal(false);
      });
    });
  });
});
