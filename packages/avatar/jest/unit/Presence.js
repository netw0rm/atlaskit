import React from 'react';
import { shallow, mount } from 'enzyme';

// import from index; ensures we're exposing Presence as a named export
import { Presence } from '../../src';
import { PRESENCE_TYPE } from '../../src/components/Presence';
import getPresenceSVG from '../../src/utils/getPresenceSVG';

describe('Avatar', () => {
  // TODO: This test is not testing anything
  describe('Presence', () => {
    PRESENCE_TYPE.values.forEach(presence =>
      describe(`when presence is ${presence}`, () =>
        it('should render content', () => {
          // eslint-disable-next-line chai-expect/missing-assertion
          expect(shallow(<Presence presence={presence} />).type(getPresenceSVG(presence)));
        })
      )
    );

    it('should render children if provided', () => {
      const wrapper = shallow(
        <Presence presence={PRESENCE_TYPE.values[0]}>
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
        expect(wrapper.getDOMNode().style.borderColor).toBe('#ffffff');
      });

      it('should reflect the prop as a CSS style property', () => {
        const wrapper = mount(<Presence presence="online" borderColor="#ff0000" />);
        expect(wrapper.getDOMNode().style.borderColor).toBe('#ff0000');
      });
    });
  });
});
