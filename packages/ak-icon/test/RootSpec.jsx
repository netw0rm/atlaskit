import React from 'react';
import chai from 'chai';
import chaiEnzyme from 'chai-enzyme';
import { shallow } from 'enzyme';

import { name } from '../package.json';
import { size } from '../src/Icon';
import Root from '../src/Root';
import styles from '../src/styles.less';

const { expect } = chai;
chai.use(chaiEnzyme());

describe(name, () => {
  describe('Root', () => {
    it('should be able to create a component', () => {
      const wrapper = shallow(<Root />);
      expect(wrapper).to.be.defined;
    });

    describe('size property', () => {
      Object.values(size).forEach((s) => {
        it(`with value ${s}`, () => {
          const wrapper = shallow(<Root size={s} />);
          expect(wrapper.find(`.${styles.locals.icon}`)).to.have.className(styles.locals[s]);
        });
      });
    });

    describe('onClick property', () => {
      it('should set a click handler', () => {
        let handlerFired = false;
        const handler = () => (handlerFired = true);

        const wrapper = shallow(<Root onClick={handler} />);
        expect(wrapper.prop('onClick')).to.equal(handler);

        wrapper.simulate('click');
        expect(handlerFired).to.equal(true);
      });
    });
  });
});
