import chai from 'chai';
import chaiAsPromised from 'chai-as-promised';
import chaiEnzyme from 'chai-enzyme';
import { shallow } from 'enzyme';
import React from 'react';

import { name } from '../package.json';
import ButtonGroup from '../src';
import styles from '../src/styles.less';

chai.use(chaiAsPromised);
chai.use(chaiEnzyme());

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
      expect(group).to.have.className(styles.locals.wrapper);
    });
  });
});
