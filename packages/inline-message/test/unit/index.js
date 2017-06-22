import React from 'react';
import { shallow, mount } from 'enzyme';
import Button from '@atlaskit/button';
import WarningIcon from '@atlaskit/icon/glyph/warning';
import CheckCircleIcon from '@atlaskit/icon/glyph/check-circle';
import {
  akColorB400,
  akColorG300,
  akColorP300,
  akColorR300,
  akColorY300,
} from '@atlaskit/util-shared-styles';
import InlineDialog from '@atlaskit/inline-dialog';
import InlineMessage from '../../src/';
import IconForType from '../../src/components/IconForType';
import IconWrapper from '../../src/styled/IconForType';
import { Text } from '../../src/styled/InlineMessage';

import { name } from '../../package.json';

describe(name, () => {
  it('basic sanity check', () => {
    expect(shallow(<InlineMessage />)).not.to.equal(undefined);
  });

  describe('isOpen state', () => {
    it('should default to false', () => {
      expect(shallow(<InlineMessage />).state('isOpen')).to.equal(false);
    });
    it('should toggle when the button is clicked', () => {
      const wrapper = shallow(<InlineMessage />);
      wrapper.find(Button).simulate('click');
      expect(wrapper.state('isOpen')).to.equal(true);
    });
  });

  describe('props', () => {
    describe('title', () => {
      it('supplied title should be rendered', () => {
        expect(mount(<InlineMessage title="Title goes here" />).find(Text).text()).to.equal('Title goes here');
      });
    });
    describe('secondaryText', () => {
      it('supplied secondary text should be rendered', () => {
        expect(mount(<InlineMessage secondaryText="Secondary goes here" />).find(Text).text()).to.equal('Secondary goes here');
      });
    });
    describe('type', () => {
      it('should default to "connectivity"', () => {
        expect(mount(<InlineMessage />).prop('type')).to.equal('connectivity');
      });
      it('should be passed to IconForType component', () => {
        expect(shallow(<InlineMessage type="error" />).find(IconForType).prop('type')).to.equal('error');
      });
    });
    describe('position', () => {
      it('should default to "bottom left"', () => {
        expect(mount(<InlineMessage />).prop('position')).to.equal('bottom left');
      });
      it('should be passed to InlineDialog component', () => {
        expect(shallow(<InlineMessage position="right middle" />).find(InlineDialog).prop('position')).to.equal('right middle');
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
          expect(wrapper.find(IconWrapper).prop('iconColor')).to.equal(akColorB400);
        });
        it('confirmation type produces confirmation icon', () => {
          const wrapper = shallow(<IconForType type="confirmation" />);
          expect(wrapper.find(CheckCircleIcon).length).to.be.above(0);
          expect(wrapper.find(IconWrapper).prop('iconColor')).to.equal(akColorG300);
        });
        it('info type produces info icon', () => {
          const wrapper = shallow(<IconForType type="info" />);
          expect(wrapper.find(WarningIcon).length).to.be.above(0);
          expect(wrapper.find(IconWrapper).prop('iconColor')).to.equal(akColorP300);
        });
        it('warning type produces warning icon', () => {
          const wrapper = shallow(<IconForType type="warning" />);
          expect(wrapper.find(WarningIcon).length).to.be.above(0);
          expect(wrapper.find(IconWrapper).prop('iconColor')).to.equal(akColorY300);
        });
        it('error type produces error icon', () => {
          const wrapper = shallow(<IconForType type="error" />);
          expect(wrapper.find(WarningIcon).length).to.be.above(0);
          expect(wrapper.find(IconWrapper).prop('iconColor')).to.equal(akColorR300);
        });
      });
    });
  });
});
