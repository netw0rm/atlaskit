import chai, { expect } from 'chai';
import React from 'react';
import chaiAsPromised from 'chai-as-promised';
import sinonChai from 'sinon-chai';
import { shallow } from 'enzyme';
import chaiEnzyme from 'chai-enzyme';
import Content from '../src/Content';
import { locals } from '../src/styles.less';
import { compact, subtle } from '../src/internal/appearances';

chai.use(chaiAsPromised);
chai.use(sinonChai);
chai.use(chaiEnzyme());

const {
  content: contentClass,
  invalid: isInvalidClass,
  focused: isFocusedClass,
  readOnly: isReadOnlyClass,
} = locals;

describe('ak-field-base', () => {
  describe('Content', () => {
    describe('by default', () =>
      it('should render a content', () =>
        expect(shallow(<Content />)).to.have.descendants(`.${contentClass}`)
      )
    );

    describe('isReadOnly prop = true', () =>
      it('should render with the .isReadOnly class', () =>
        expect(shallow(<Content isReadOnly />)).to.have.descendants(`.${isReadOnlyClass}`)
      )
    );

    describe('isFocused prop = true', () => {
      it('should render the slotwrapper with the .isFocused class', () =>
        expect(shallow(<Content isFocused />)).to.have.descendants(`.${isFocusedClass}`)
      );
    });

    describe('isInvalid prop = true', () =>
      it('should render with the isFocused styles and not the isInvalid styles', () =>
        expect(shallow(<Content isInvalid />)).to.have.descendants(`.${isInvalidClass}`)
      )
    );

    describe('isFocused prop = true AND isInvalid prop = true', () =>
      it('should render with the isFocused styles and not the isInvalid styles', () => {
        const wrapper = shallow(<Content isFocused isInvalid />);
        expect(wrapper).to.have.descendants(`.${isFocusedClass}`);
        expect(wrapper).to.not.have.descendants(`.${isInvalidClass}`);
      })
    );

    describe('rightGutter prop', () => {
      it('should render properly', () => {
        const div = <div id="right">test</div>;
        const wrapper = shallow(<Content rightGutter={div} />);
        expect(wrapper.find(`.${locals.rightGutterWrapper}`)).to.contain(div);
      });

      it('should not render rightGutterWrapper when prop is not set', () =>
        expect(shallow(<Content />)).to.not.have.descendants(`.${locals.rightGutterWrapper}`)
      );
    });

    describe('appearance', () => {
      [compact, subtle].forEach(appearance =>
        describe(appearance, () =>
          it(`should render the content with the .${appearance} class`, () =>
            expect(shallow(<Content appearance={appearance} />)).to.have.descendants(`.${locals[appearance]}`)
          )
        )
      );
    });
  });
});
