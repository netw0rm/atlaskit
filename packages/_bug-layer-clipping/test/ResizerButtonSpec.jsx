import { mount } from 'enzyme';
import React from 'react';
import ResizerButton from '../src/components/js/ResizerButton';

describe('<ResizerButton />', () => {
  describe('renders', () => {
    it('when isPointingRight={false}, <ResizerButton aria-expanded={false} />', () => {
      expect(mount(<ResizerButton isPointingRight={false} />).find('button').props()['aria-expanded']).to.equal(true);
    });
    it('when isPointingRight, <ResizerButton aria-expanded />', () => {
      expect(mount(<ResizerButton isPointingRight />).find('button').props()['aria-expanded']).to.equal(false);
    });
  });
});
