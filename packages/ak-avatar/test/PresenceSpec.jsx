import chai from 'chai';
import chaiEnzyme from 'chai-enzyme';
import React from 'react';
import { mount } from 'enzyme';

import Presence from '../src/Presence';
import icons from '../src/internal/presence-icons';
import presences from '../src/internal/presences';

const { expect } = chai;
chai.use(chaiEnzyme());

describe('ak-avatar', () => {
  describe('Presence', () => {
    // each of these should cause no presence to be rendered
    [null, 'none', 'spooky'].forEach(presence =>
      describe(`when presence is ${presence}`, () =>
        it('should not render content', () =>
          expect(mount(<Presence presence={presence} />).type(icons.none))
        )
      )
    );

    presences.forEach(presence =>
      describe(`when presence is ${presence}`, () =>
        it('should not render content', () =>
          expect(mount(<Presence presence={presence} />).type(icons[presence]))
        )
      )
    );
  });
});
