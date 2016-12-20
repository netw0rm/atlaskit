import chai from 'chai';
import chaiEnzyme from 'chai-enzyme';
import React from 'react';
import { shallow, mount } from 'enzyme';

// we import from index so we know we are definitely exposing Presence as a separate component
import { Presence } from '../src/index';
import icons from '../src/internal/icons';
import presences from '../src/internal/presences';

const { expect } = chai;
chai.use(chaiEnzyme());

describe('ak-avatar', () => {
  describe('Presence', () => {
    presences.forEach(presence =>
      describe(`when presence is ${presence}`, () =>
        it('should render content', () =>
          expect(shallow(<Presence presence={presence} />).type(icons[presence]))
        )
      )
    );

    it('should render children if provided', () => {
      const wrapper = shallow(
        <Presence presence={presences[0]}>
          <span className="child" />
        </Presence>
      );
      expect(wrapper).to.not.have.descendants(Presence);
      expect(wrapper).to.have.exactly(1).descendants('span');
      expect(wrapper.find('span')).to.have.className('child');
    });

    describe('borderColor prop', () => {
      it('should be white by default', () => {
        const wrapper = mount(<Presence presence="online" />);
        expect(wrapper).to.have.prop('borderColor', 'white');
      });

      it('should reflect the prop as a CSS style property', () => {
        const wrapper = mount(<Presence presence="online" borderColor="#ff0000" />);
        expect(wrapper).to.have.style('border-color', '#ff0000');
      });
    });
  });
});
