import React from 'react';
import { mount, ReactWrapper } from 'enzyme';
import Flag, { FlagGroup } from '@atlaskit/flag';
import ErrorIcon from '@atlaskit/icon/glyph/error';
import { Portal } from '@atlaskit/layer-manager';

import ErrorFlag from '../../../../src/common/components/ErrorFlag';

describe('<ErrorFlag> Component', () => {
  let mockProps = null;

  beforeEach(() => {
    mockProps = {
      title: 'Something went wrong',
      description: 'The toaster caught on fire again!',
      showFlag: true,
      source: 'network',
      onDismissed: jest.fn(),
      flagActions: [
        { content: 'Put fire out', onClick: jest.fn() },
        { content: 'It\'s fine...', onClick: jest.fn() },
      ],
      firePrivateAnalyticsEvent: jest.fn(),
    };
  });

  describe('render', () => {
    it('should trigger an analytics event when the flag is shown', () => {
      mount(<ErrorFlag {...mockProps} showFlag />);

      expect(mockProps.firePrivateAnalyticsEvent).toBeCalledWith('xflow.network.error-flag.displayed');
    });

    it('should not trigger an analytics event when no flag is shown', () => {
      mount(<ErrorFlag {...mockProps} showFlag={false} />);

      expect(mockProps.firePrivateAnalyticsEvent).not.toBeCalledWith('xflow.network.error-flag.displayed');
    });

    it('should render the flag when showFlag is true', () => {
      const wrapper = mount(<ErrorFlag {...mockProps} showFlag />);
      // finding the portal
      // please refer: https://github.com/airbnb/enzyme/issues/536#issuecomment-239311682
      const portal = wrapper.find(Portal);
      const portalWrapper = new ReactWrapper(portal.node.props.children);
      const flag = portalWrapper.find(Flag);
      expect(flag.exists()).toBeTruthy();
      expect(flag.props().title).toBe(mockProps.title);
      expect(flag.props().description).toBe(mockProps.description);
      expect(flag.props().actions).toBe(mockProps.flagActions);
      expect(flag.find(ErrorIcon).exists()).toBeTruthy();
    });

    it('should not render the flag when showFlag is false', () => {
      const wrapper = mount(<ErrorFlag {...mockProps} showFlag={false} />);

      const flag = wrapper.find(Flag);
      expect(flag.exists()).toBeFalsy();
    });

    it('should pass onDismissed to the FlagGroup', () => {
      const wrapper = mount(<ErrorFlag {...mockProps} showFlag />);

      const flagGroup = wrapper.find(FlagGroup);
      expect(flagGroup.exists()).toBeTruthy();
      expect(flagGroup.props().onDismissed).toBe(mockProps.onDismissed);
    });
  });
});
