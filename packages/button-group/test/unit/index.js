import { shallow } from 'enzyme';
import React from 'react';

import { name } from '../../package.json';
import ButtonGroup from '../../src';

describe(name, () => {
  describe('basic behavior', () => {
    it('should render all the children', () => {
      const group = shallow(<ButtonGroup><div>1</div><div>2</div><div>3</div></ButtonGroup>);
      expect(group.contains(<div>1</div>)).to.equal(true);
      expect(group.contains(<div>2</div>)).to.equal(true);
      expect(group.contains(<div>3</div>)).to.equal(true);
      expect(group.children().length).to.equal(3);
    });

    // Test removed because we cant use style loader in tests and we are moving components to styled
    // -components
    // it(`should have className ${styles.locals.wrapper}`, () => {
    //   const group = shallow(<ButtonGroup />);
    //   expect((group).hasClass((styles.locals.wrapper))).to.equal(true);
    // });
  });
});
