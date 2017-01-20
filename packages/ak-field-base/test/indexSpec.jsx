import chai, { expect } from 'chai';
import React from 'react';
import chaiAsPromised from 'chai-as-promised';
import sinonChai from 'sinon-chai';
import { shallow, mount } from 'enzyme';
import chaiEnzyme from 'chai-enzyme';
import WarningIcon from 'ak-icon/glyph/warning';
import { FieldBase } from '../src';
import { compact, none, subtle } from '../src/internal/appearances';
import { locals } from '../src/styles.less';

chai.use(chaiAsPromised);
chai.use(sinonChai);
chai.use(chaiEnzyme());

const {
  contentContainer: contentClass,
  invalid: isInvalidClass,
  focused: isFocusedClass,
  readOnly: isReadOnlyClass,
  paddingDisabled: isPaddingDisabled,
} = locals;

const defaultProps = {
  onFocus: () => {},
  onBlur: () => {},
};

describe('ak-field-base', () => {
  describe('properties', () => {
    describe('by default', () =>
      it('should render a content', () =>
        expect(shallow(<FieldBase {...defaultProps} />)).to.have.descendants(`.${contentClass}`)
      )
    );

    describe('isReadOnly prop = true', () =>
      it('should render with the .isReadOnly class', () =>
        expect(shallow(<FieldBase {...defaultProps} isReadOnly />)).to.have.descendants(`.${isReadOnlyClass}`)
      )
    );

    describe('isFocused prop = true', () => {
      it('should render the content with the .isFocused class', () =>
        expect(shallow(<FieldBase {...defaultProps} isFocused />)).to.have.descendants(`.${isFocusedClass}`)
      );
    });

    describe('isPaddingDisabled prop = true', () => {
      it('should render the content with the .paddingDisabled class', () =>
        expect(shallow(<FieldBase {...defaultProps} isPaddingDisabled />)).to.have.descendants(`.${isPaddingDisabled}`)
      );
    });

    describe('isInvalid prop = true', () => {
      it('should render with the isFocused styles and not the isInvalid styles', () =>
        expect(shallow(<FieldBase {...defaultProps} isInvalid />)).to.have.descendants(`.${isInvalidClass}`)
      );

      it('should render the warning icon', () =>
        expect(shallow(<FieldBase {...defaultProps} isInvalid />)).to.have.descendants(WarningIcon)
      );
    });

    describe('isFocused prop = true AND isInvalid prop = true', () =>
      it('should render with the isFocused styles and not the isInvalid styles', () => {
        const wrapper = shallow(<FieldBase {...defaultProps} isFocused isInvalid />);
        expect(wrapper).to.have.descendants(`.${isFocusedClass}`);
        expect(wrapper).to.not.have.descendants(`.${isInvalidClass}`);
      })
    );

    describe('appearance', () => {
      [compact, none, subtle].forEach(appearance =>
        describe(appearance, () =>
          it(`should render the content with the .${appearance} class`, () =>
            expect(shallow(<FieldBase {...defaultProps} appearance={appearance} />))
              .to.have.descendants(`.${locals[appearance]}`)
          )
        )
      );
    });
  });

  describe('focus behaviour', () => {
    let wrapper;

    beforeEach(() => {
      wrapper = mount(<FieldBase {...defaultProps} />);
      wrapper.find(`.${contentClass}`).simulate('focus');
    });

    it('should call onFocus', () => {
      const spy = sinon.spy();
      wrapper = mount(<FieldBase {...defaultProps} onFocus={spy} />);
      wrapper.find(`.${contentClass}`).simulate('focus');
      expect(spy.callCount).to.equal(1);
    });

    it('should call onBlur', () => {
      const spy = sinon.spy();
      wrapper = mount(<FieldBase {...defaultProps} onBlur={spy} />);
      wrapper.find(`.${contentClass}`).simulate('blur');
      expect(spy.callCount).to.equal(1);
    });
  });
});
