import chai from 'chai';
import chaiEnzyme from 'chai-enzyme';
import React from 'react';
import { shallow } from 'enzyme';

import Presence from '../src/Presence';
import icons from '../src/internal/icons';
import presences from '../src/internal/presences';

const { expect } = chai;
chai.use(chaiEnzyme());

describe('ak-avatar', () => {
  describe('Presence', () => {
    // each of these should cause no presence to be rendered
    [null, 'none', 'spooky'].forEach(presence =>
      describe(`when presence is ${presence}`, () =>
        it('should not render content', () =>
          expect(shallow(<Presence presence={presence} />).type(icons.none))
        )
      )
    );

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
  });
});
