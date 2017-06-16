/* eslint-disable  mocha/no-skipped-tests */
import React from 'react';
import { expect } from 'chai';
import { shallow, mount } from 'enzyme';

// import from index; ensures we're exposing Presence as a named export
import { Presence } from '../../src';
import { PRESENCE_TYPE } from '../../src/components/Presence';
// import getPresenceSVG from '../../src/utils/getPresenceSVG';

describe('Avatar', () => {
  describe('Presence', () => {
    // PRESENCE_TYPE.values.forEach(presence =>
    //   describe(`when presence is ${presence}`, () =>
    //     it('should render content', () => {
    //       expect(shallow(<Presence presence={presence} />).props().children)
    //         .to.deep.equal(getPresenceSVG(presence));
    //     })
    //   )
    // );

    it('should render children if provided', () => {
      const wrapper = shallow(
        <Presence presence={PRESENCE_TYPE.values[0]}>
          <span className="child" />
        </Presence>
      );
      expect(wrapper.find(Presence).length).to.equal(0);
      expect(wrapper.find('span').length).to.equal(1);
      expect((wrapper.find('span')).hasClass(('child'))).to.equal(true);
    });

    describe('borderColor prop', () => {
      it('should be white by default', () => {
        const wrapper = mount(<Presence presence="online" />);
        expect(wrapper.getDOMNode().style.borderColor).to.equal('#ffffff');
      });

      it('should reflect the prop as a CSS style property', () => {
        const wrapper = mount(<Presence presence="online" borderColor="#ff0000" />);
        expect(wrapper.getDOMNode().style.borderColor).to.equal('#ff0000');
      });
    });
  });
});
