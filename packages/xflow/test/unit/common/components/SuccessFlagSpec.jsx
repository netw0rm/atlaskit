import React from 'react';
import { mount, ReactWrapper } from 'enzyme';
import Flag, { FlagGroup } from '@atlaskit/flag';
import { Portal } from '@atlaskit/layer-manager';
import CheckCircleIcon from '@atlaskit/icon/glyph/check-circle';

import SuccessFlag from '../../../../src/common/components/SuccessFlag';

describe('<SuccessFlag> Component', () => {
  let mockProps = null;

  beforeEach(() => {
    mockProps = {
      title: 'Everything is ok!',
      description: 'The toaster cooked your toast perfectly!',
      showFlag: true,
      source: 'network',
      onDismissed: jest.fn(),
      flagActions: [
        { content: 'Eat it', onClick: jest.fn() },
        { content: 'Amazing...', onClick: jest.fn() },
      ],
      firePrivateAnalyticsEvent: jest.fn(),
    };
  });

  describe('render', () => {
    it('should trigger an analytics event when the flag is shown', () => {
      mount(<SuccessFlag {...mockProps} showFlag />);

      expect(mockProps.firePrivateAnalyticsEvent).toBeCalledWith('xflow.network.success-flag.displayed');
    });

    it('should not trigger an analytics event when no flag is shown', () => {
      mount(<SuccessFlag {...mockProps} showFlag={false} />);

      expect(mockProps.firePrivateAnalyticsEvent).not.toBeCalledWith('xflow.network.success-flag.displayed');
    });

    it('should render the flag when showFlag is true', () => {
      const wrapper = mount(<SuccessFlag {...mockProps} showFlag />);
      // finding the portal
      // please refer: https://github.com/airbnb/enzyme/issues/536#issuecomment-239311682
      const portal = wrapper.find(Portal);
      const portalWrapper = new ReactWrapper(portal.node.props.children);
      const flag = portalWrapper.find(Flag);
      expect(flag.props().title).toBe(mockProps.title);
      expect(flag.props().description).toBe(mockProps.description);
      expect(flag.props().actions).toBe(mockProps.flagActions);
      expect(flag.find(CheckCircleIcon).exists()).toBeTruthy();
    });

    it('should not render the flag when showFlag is false', () => {
      const wrapper = mount(<SuccessFlag {...mockProps} showFlag={false} />);

      const flag = wrapper.find(Flag);
      expect(flag.exists()).toBeFalsy();
    });

    it('should pass onDismissed to the FlagGroup', () => {
      const wrapper = mount(<SuccessFlag {...mockProps} showFlag />);

      const flagGroup = wrapper.find(FlagGroup);
      expect(flagGroup.exists()).toBeTruthy();
      expect(flagGroup.props().onDismissed).toBe(mockProps.onDismissed);
    });
  });
});
