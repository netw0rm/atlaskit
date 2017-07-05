/* eslint-disable  mocha/no-skipped-tests */
import React from 'react';
import { shallow, mount } from 'enzyme';

// import from index; ensures we're exposing Presence as a named export
import { Presence } from '../../src';
import { ICON_TYPE } from '../../src/components/Presence';
import getPresenceSVG from '../../src/helpers/getPresenceSVG';

describe('Avatar', () => {
  // TODO: This test is not testing anything
  describe('Presence', () => {
    ICON_TYPE.values.forEach(presence =>
      describe(`when presence is ${presence}`, () =>
        it('should render content', () => {
          // eslint-disable-next-line chai-expect/missing-assertion
          expect(shallow(<Presence presence={presence} />).type(getPresenceSVG(presence)));
        })
      )
    );

    it('should render children if provided', () => {
      const wrapper = shallow(
        <Presence presence={ICON_TYPE.values[0]}>
          <span className="child" />
        </Presence>
      );
      expect(wrapper.find(Presence).length).toBe(0);
      expect(wrapper.find('span').length).toBe(1);
      expect((wrapper.find('span')).hasClass(('child'))).toBe(true);
    });

    describe('borderColor prop', () => {
      it('should be white by default', () => {
        const wrapper = mount(<Presence presence="online" />);
        expect(wrapper.prop('borderColor')).toBe('#FFFFFF');
      });

      // TODO: come back to this
      it.skip('should reflect the prop as a CSS style property', () => {
        const wrapper = mount(<Presence presence="online" borderColor="#FF0000" />);
        const bgColor = wrapper.getDOMNode().style.backgroundColor;
        expect(bgColor).toBe('#FF0000');
      });
    });
  });
});
