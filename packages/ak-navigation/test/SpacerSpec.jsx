import { shallow } from 'enzyme';
import React from 'react';
import Spacer from '../src/components/js/Spacer';

describe('<Spacer />', () => {
  describe('props', () => {
    it('default width is 0', () => {
      expect(shallow(<Spacer />).find('div').props().style.width).to.equal(0);
    });
    it('width prop is reflected on as styled width', () => {
      expect(shallow(<Spacer width={500} />).find('div').props().style.width).to.equal(500);
      expect(shallow(<Spacer width={200} />).find('div').props().style.width).to.equal(200);
    });
  });
});
