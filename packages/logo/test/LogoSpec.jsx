import { shallow } from 'enzyme';
import React from 'react';
import Logo from '../src/Logo';

describe('<Logo />', () => {
  describe('props', () => {
    it('should render an svg', () => {
      expect(shallow(<Logo logoText={<svg />} />).find('svg')).to.have.length(1);
    });
  });
});
