/* eslint-disable  mocha/no-skipped-tests */
import React from 'react';
import { shallow, mount } from 'enzyme';

// we import from index so we know we are definitely exposing Presence as a separate component
import Presence, { PRESENCE_TYPE } from '../../src/Presence';
import icons from '../../src/internal/icons';
import { locals as styles } from '../../src/styles.less';

describe('ak-avatar', () => {
  describe('Presence', () => {
    PRESENCE_TYPE.values.forEach(presence =>
      describe(`when presence is ${presence}`, () =>
        it('should render content', () =>
          expect(shallow(<Presence presence={presence} />).type(icons[presence]))
        )
      )
    );

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

    describe.skip('borderColor prop', () => {
      it('should be white by default', () => {
        const wrapper = mount(<Presence presence="online" />);
        expect(wrapper.find(`.${styles.presence}`).node.style.borderColor).to.equal('#ffffff');
      });

      it('should reflect the prop as a CSS style property', () => {
        const wrapper = mount(<Presence presence="online" borderColor="#ff0000" />);
        expect(wrapper.find(`.${styles.presence}`).node.style.borderColor).to.equal('#ff0000');
      });
    });
  });
});
