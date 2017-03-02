import React from 'react';
import { mount } from 'enzyme';
import { akColorR400, akColorG75 } from '@atlaskit/util-shared-styles';
import AkServiceHeader, { ServiceHeader } from '../src';
import { getContainerBackgroundColor } from '../src/styled';

import { name } from '../package.json';

describe(name, () => {
  describe('stateless', () => {
    it('should print out when it is active', () => {
      const wrapper = mount(<ServiceHeader isActive />);
      expect(wrapper.find('button').text()).to.equal('active');
    });

    it('should print out when it is not active', () => {
      const wrapper = mount(<ServiceHeader />);
      expect(wrapper.find('button').text()).to.equal('not active');
    });

    it('should prefix its active state with a label', () => {
      const wrapper = mount(
        <ServiceHeader
          isActive
          label="My toggle"
        />
      );
      expect(wrapper.find('button').text()).to.equal('My toggle: active');
    });

    it('should fire onServiceHeader when the button is clicked', () => {
      const stub = sinon.stub();
      const wrapper = mount(
        <ServiceHeader
          onServiceHeader={stub}
        />
      );

      wrapper.find('button').simulate('click');

      expect(stub.callCount).to.equal(1);
    });

    // [Current patterns for testing dynamic styles](https://extranet.atlassian.com/display/AtlasKit/Moving+from+Less+to+Styled+Components)
    it('should have a green background when active', () => {
      expect(getContainerBackgroundColor({ isActive: true })).to.equal(akColorG75);
    });

    it('should have a red background when not active', () => {
      expect(getContainerBackgroundColor({ isActive: false })).to.equal(akColorR400);
    });
  });

  describe('stateful', () => {
    it('should toggle the active state of the ServiceHeader onServiceHeader', () => {
      const wrapper = mount(<AkServiceHeader label="hello" />);
      const stateless = wrapper.find(ServiceHeader);

      expect(stateless.props().isActive).to.equal(false);

      stateless.props().onServiceHeader();

      expect(stateless.props().isActive).to.equal(true);
    });
  });
});
