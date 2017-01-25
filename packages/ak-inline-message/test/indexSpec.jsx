import chai from 'chai';
import React from 'react';
import { shallow, mount } from 'enzyme';
import Button from 'ak-button';
import WarningIcon from 'ak-icon/glyph/warning';
import {
  akColorB400,
  akColorG300,
  akColorP300,
  akColorR300,
  akColorY300,
} from 'akutil-shared-styles';
import SuccessIcon from 'ak-icon/glyph/success';
import styles from 'style!../src/styles.less';
import InlineMessage from '../src';
import IconForType from '../src/internal/IconForType';

import { name } from '../package.json';

const { expect } = chai;
describe(name, () => {
  it('basic sanity check', () =>
    expect(shallow(
      <InlineMessage />
    )).not.to.equal(undefined)
  );

  describe('isOpen state', () => {
    it('should default to false', () => {
      expect(shallow(<InlineMessage />)).to.have.state('isOpen', false);
    });
    it('should toggle when the button is clicked', () => {
      const wrapper = shallow(<InlineMessage />);
      wrapper.find(Button).simulate('click');
      expect(wrapper).to.have.state('isOpen', true);
    });
  });

  describe('props', () => {
    describe('title', () => {
      it('supplied title should be rendered', () => {
        expect(shallow(
          <InlineMessage title="Title goes here" />
        ).find(`.${styles.titleText}`)).to.have.text('Title goes here');
      });
    });
    describe('secondaryText', () => {
      it('supplied secondary text should be rendered', () => {
        expect(shallow(
          <InlineMessage secondaryText="Secondary goes here" />
        ).find(`.${styles.secondaryText}`)).to.have.text('Secondary goes here');
      });
    });
    describe('type', () => {
      it('should default to "connectivity"', () => {
        expect(mount(<InlineMessage />)).to.have.prop('type', 'connectivity');
      });
      it('should be passed to IconForType component', () => {
        const wrapper = mount(<InlineMessage type="error" />);
        expect(wrapper.find(IconForType)).to.have.prop('type', 'error');
      });
    });
  });

  describe('IconForType component', () => {
    describe('props', () => {
      // These will be updated once we have the actual icons.
      // See https://ecosystem.atlassian.net/browse/AK-1416
      describe('type', () => {
        it('connectivity type produces connectivity icon', () => {
          const wrapper = shallow(<IconForType type="connectivity" />);
          expect(wrapper).to.have.descendants(WarningIcon);
          expect(wrapper.find(`.${styles.iconWrapper}`)).to.have.style('color', akColorB400);
        });
        it('confirmation type produces confirmation icon', () => {
          const wrapper = shallow(<IconForType type="confirmation" />);
          expect(wrapper).to.have.descendants(SuccessIcon);
          expect(wrapper.find(`.${styles.iconWrapper}`)).to.have.style('color', akColorG300);
        });
        it('info type produces info icon', () => {
          const wrapper = shallow(<IconForType type="info" />);
          expect(wrapper).to.have.descendants(WarningIcon);
          expect(wrapper.find(`.${styles.iconWrapper}`)).to.have.style('color', akColorP300);
        });
        it('warning type produces warning icon', () => {
          const wrapper = shallow(<IconForType type="warning" />);
          expect(wrapper).to.have.descendants(WarningIcon);
          expect(wrapper.find(`.${styles.iconWrapper}`)).to.have.style('color', akColorY300);
        });
        it('error type produces error icon', () => {
          const wrapper = shallow(<IconForType type="error" />);
          expect(wrapper).to.have.descendants(WarningIcon);
          expect(wrapper.find(`.${styles.iconWrapper}`)).to.have.style('color', akColorR300);
        });
      });
    });
  });
});
