import { shallow } from 'enzyme';
import React from 'react';
import DefaultLogo from '../../src/';

describe('<Logo />', () => {
  describe('props', () => {
    it('should render an svg', () => {
      const wrapper = shallow(<DefaultLogo />);
      // Need to search the html string because we use dangerouslySetInnerHTML, which
      // does not work with .find
      expect(wrapper.html().includes('<svg')).toBe(true);
    });
  });
});
