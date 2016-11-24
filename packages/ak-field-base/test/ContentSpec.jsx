import chai, { expect } from 'chai';
import React from 'react';
import chaiAsPromised from 'chai-as-promised';
import sinonChai from 'sinon-chai';
import { shallow } from 'enzyme';
import chaiEnzyme from 'chai-enzyme';
import Content from '../src/Content';
import styles from '../src/styles.less';
import { compact, subtle } from '../src/internal/appearances';

chai.use(chaiAsPromised);
chai.use(sinonChai);
chai.use(chaiEnzyme());

const {
  content: contentClass,
  invalid: invalidClass,
  focused: focusedClass,
} = styles.locals;

describe('ak-field-base', () => {
  describe('Content', () => {
    describe('by default', () =>
      it('should render a content', () =>
        expect(shallow(<Content />)).to.have.descendants(`.${contentClass}`)
      )
    );

    describe('focused prop = true', () => {
      it('should render the slotwrapper with the .focused class', () =>
        expect(shallow(<Content focused />)).to.have.descendants(`.${focusedClass}`)
      );
    });

    describe('invalid prop = true', () =>
      it('should render with the focused styles and not the invalid styles', () =>
        expect(shallow(<Content invalid />)).to.have.descendants(`.${invalidClass}`)
      )
    );

    describe('focused prop = true AND invalid prop = true', () =>
      it('should render with the focused styles and not the invalid styles', () => {
        const wrapper = shallow(<Content focused invalid />);
        expect(wrapper).to.have.descendants(`.${focusedClass}`);
        expect(wrapper).to.not.have.descendants(`.${invalidClass}`);
      })
    );

    describe('appearance', () => {
      [compact, subtle].forEach(appearance =>
        describe(appearance, () =>
          it(`should render the content with the .${appearance} class`, () =>
            expect(shallow(<Content appearance={appearance} />)).to.have.descendants(`.${styles.locals[appearance]}`)
          )
        )
      );
    });
  });
});
