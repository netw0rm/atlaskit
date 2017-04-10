import { shallow } from 'enzyme';
import React from 'react';
import Logo from '../src/Logo';

describe('<Logo />', () => {
  describe('props', () => {
    it('should render an svg', () => {
      expect(shallow(<Logo logoText={<svg />} />).find('svg')).to.have.length(1);
    });
    describe('collapseTo prop', () => {
      it('should not collapse by default', () => {
        const wrapper = shallow(<Logo size="small" />);
        expect(wrapper.props().collapseTo).to.equal(undefined);
        wrapper.unmount();
      });

      // Note: other values can be supplied, but will cause a PropType warning
      it('should accept "type" or "icon"', () => {
        const typeWrapper = shallow(<Logo collapseTo="type" size="small" />);
        expect(typeWrapper.props().collapseTo).to.equal('type');

        const iconWrapper = shallow(<Logo collapseTo="icon" size="small" />);
        expect(iconWrapper.props().collapseTo).to.equal('icon');
        typeWrapper.unmount();
        iconWrapper.unmount();
      });
    });
  });
});
