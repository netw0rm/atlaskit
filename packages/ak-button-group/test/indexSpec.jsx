import chai from 'chai';
import { shallow } from 'enzyme';
import React from 'react';

import { name } from '../package.json';
import ButtonGroup from '../src';
import styles from '../src/styles.less';

const expect = chai.expect;

describe(name, () => {
  describe('basic behavior', () => {
    it('should render all the children', () => {
      const group = shallow(<ButtonGroup><div>1</div><div>2</div><div>3</div></ButtonGroup>);
      expect(group).to.contain(<div>1</div>);
      expect(group).to.contain(<div>2</div>);
      expect(group).to.contain(<div>3</div>);
      expect(group.children().length).to.equal(3);
    });

    it(`should have className ${styles.locals.wrapper}`, () => {
      const group = shallow(<ButtonGroup />);
      expect((group).hasClass((styles.locals.wrapper))).to.equal(true);
    });
  });
});
