import { mount } from 'enzyme';
import React from 'react';
import ResizerButton from '../src/components/js/ResizerButton';

describe('<ResizerButton />', () => {
  describe('renders', () => {
    it('when isPointingRight={false}, <ResizerButton aria-expanded={false} />', () => {
      const wrapper = mount(<ResizerButton isPointingRight={false} />);
      expect(wrapper.find('button').props()['aria-expanded']).to.equal(true);
      wrapper.unmount();
    });
    it('when isPointingRight, <ResizerButton aria-expanded />', () => {
      const wrapper = mount(<ResizerButton isPointingRight />);
      expect(wrapper.find('button').props()['aria-expanded']).to.equal(false);
      wrapper.unmount();
    });
  });
});
