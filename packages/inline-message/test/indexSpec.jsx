import React from 'react';
import { shallow, mount } from 'enzyme';
import Button from '@atlaskit/button';
import WarningIcon from 'ak-icon/glyph/warning';
import {
  akColorB400,
  akColorG300,
  akColorP300,
  akColorR300,
  akColorY300,
} from '@atlaskit/util-shared-styles';
import SuccessIcon from 'ak-icon/glyph/success';
import InlineDialog from '@atlaskit/inline-dialog';
import styles from 'style!../src/styles.less';
import InlineMessage from '../src';
import IconForType from '../src/internal/IconForType';

import { name } from '../package.json';

describe(name, () => {
  it('basic sanity check', () => {
    const wrapper = shallow(<InlineMessage />);
    expect().not.to.equal(undefined);
    wrapper.unmount();
  });

  describe('isOpen state', () => {
    it('should default to false', () => {
      const wrapper = shallow(<InlineMessage />);
      expect(wrapper.state('isOpen')).to.equal(false);
      wrapper.unmount();
    });
    it('should toggle when the button is clicked', () => {
      const wrapper = shallow(<InlineMessage />);
      wrapper.find(Button).simulate('click');
      expect(wrapper.state('isOpen')).to.equal(true);
      wrapper.unmount();
    });
  });

  describe('props', () => {
    describe('title', () => {
      it('supplied title should be rendered', () => {
        const wrapper = shallow(<InlineMessage title="Title goes here" />);
        expect(wrapper.find(`.${styles.titleText}`).text()).to.equal('Title goes here');
        wrapper.unmount();
      });
    });
    describe('secondaryText', () => {
      it('supplied secondary text should be rendered', () => {
        const wrapper = shallow(<InlineMessage secondaryText="Secondary goes here" />);
        expect(wrapper.find(`.${styles.secondaryText}`).text()).to.equal('Secondary goes here');
        wrapper.unmount();
      });
    });
    describe('type', () => {
      it('should default to "connectivity"', () => {
        const wrapper = mount(<InlineMessage />);
        expect(wrapper.prop('type')).to.equal('connectivity');
        wrapper.unmount();
      });
      it('should be passed to IconForType component', () => {
        const wrapper = shallow(<InlineMessage type="error" />);
        expect(wrapper.find(IconForType).prop('type')).to.equal('error');
        wrapper.unmount();
      });
    });
    describe('position', () => {
      it('should default to "bottom left"', () => {
        const wrapper = mount(<InlineMessage />);
        expect(wrapper.prop('position')).to.equal('bottom left');
        wrapper.unmount();
      });
      it('should be passed to InlineDialog component', () => {
        const wrapper = shallow(<InlineMessage position="right middle" />);
        expect(wrapper.find(InlineDialog).prop('position')).to.equal('right middle');
        wrapper.unmount();
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
          expect(wrapper.find(WarningIcon).length).to.be.above(0);
          expect(wrapper.find(`.${styles.iconWrapper}`).prop('style').color).to.equal(akColorB400);
          wrapper.unmount();
        });
        it('confirmation type produces confirmation icon', () => {
          const wrapper = shallow(<IconForType type="confirmation" />);
          expect(wrapper.find(SuccessIcon).length).to.be.above(0);
          expect(wrapper.find(`.${styles.iconWrapper}`).prop('style').color).to.equal(akColorG300);
          wrapper.unmount();
        });
        it('info type produces info icon', () => {
          const wrapper = shallow(<IconForType type="info" />);
          expect(wrapper.find(WarningIcon).length).to.be.above(0);
          expect(wrapper.find(`.${styles.iconWrapper}`).prop('style').color).to.equal(akColorP300);
          wrapper.unmount();
        });
        it('warning type produces warning icon', () => {
          const wrapper = shallow(<IconForType type="warning" />);
          expect(wrapper.find(WarningIcon).length).to.be.above(0);
          expect(wrapper.find(`.${styles.iconWrapper}`).prop('style').color).to.equal(akColorY300);
          wrapper.unmount();
        });
        it('error type produces error icon', () => {
          const wrapper = shallow(<IconForType type="error" />);
          expect(wrapper.find(WarningIcon).length).to.be.above(0);
          expect(wrapper.find(`.${styles.iconWrapper}`).prop('style').color).to.equal(akColorR300);
          wrapper.unmount();
        });
      });
    });
  });
});
