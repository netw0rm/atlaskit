import { shallow } from 'enzyme';
import React from 'react';
import DrawerTrigger from '../../src/components/js/DrawerTrigger';

describe('<DrawerTrigger />', () => {
  describe('interacting', () => {
    it('click should call the onActivate handler', () => {
      const spy = jest.fn();
      shallow(<DrawerTrigger onActivate={spy} />).find('DrawerTriggerInner').simulate('click');
      expect(spy).toHaveBeenCalled();
    });
  });
});

