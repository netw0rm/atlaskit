import React from 'react';
import { shallow, mount } from 'enzyme';
import WarningIcon from '@atlaskit/icon/glyph/warning';
import Spinner from '@atlaskit/spinner';
import FieldBaseSmart, { FieldBase } from '../src';
import { none, subtle } from '../src/internal/appearances';
import { locals } from '../src/styles.less';

const {
  contentContainer: contentClass,
  compact: isCompactClass,
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
        expect(shallow(<FieldBase {...defaultProps} />).find(`.${contentClass}`).length).to.be.above(0)
      )
    );

    describe('isReadOnly prop = true', () =>
      it('should render with the .isReadOnly class', () =>
        expect(shallow(<FieldBase {...defaultProps} isReadOnly />).find(`.${isReadOnlyClass}`).length).to.be.above(0)
      )
    );

    describe('isFocused prop = true', () => {
      it('should render the content with the .isFocused class', () =>
        expect(shallow(<FieldBase {...defaultProps} isFocused />).find(`.${isFocusedClass}`).length).to.be.above(0)
      );
    });

    describe('isPaddingDisabled prop = true', () => {
      it('should render the content with the .paddingDisabled class', () =>
        expect(shallow(<FieldBase {...defaultProps} isPaddingDisabled />).find(`.${isPaddingDisabled}`).length).to.be.above(0)
      );
    });

    describe('isInvalid prop = true', () => {
      it('should render with the isFocused styles and not the isInvalid styles', () =>
        expect(shallow(<FieldBase {...defaultProps} isInvalid />).find(`.${isInvalidClass}`).length).to.be.above(0)
      );

      it('should render the warning icon', () =>
        expect(shallow(<FieldBase {...defaultProps} isInvalid />)
          .find(WarningIcon).length).to.be.above(0)
      );
    });

    describe('isFocused prop = true AND isInvalid prop = true', () =>
      it('should render with the isFocused styles and not the isInvalid styles', () => {
        const wrapper = shallow(<FieldBase {...defaultProps} isFocused isInvalid />);
        expect(wrapper.find(`.${isFocusedClass}`).length).to.be.above(0);
        expect(wrapper.find(`.${isInvalidClass}`).length).to.equal(0);
      })
    );

    describe('isCompact prop = true', () => {
      it('should render the content with the .isCompact class', () =>
        expect(shallow(<FieldBase {...defaultProps} isCompact />).find(`.${isCompactClass}`).length).to.be.above(0)
      );
    });

    describe('appearance', () => {
      [none, subtle].forEach(appearance =>
        describe(appearance, () =>
          it(`should render the content with the .${appearance} class`, () =>
            expect(shallow(<FieldBase {...defaultProps} appearance={appearance} />).find(`.${locals[appearance]}`).length).to.be.above(0)
          )
        )
      );
    });

    describe('shouldReset', () =>
      it('should call onBlur when set', () => {
        const spy = sinon.spy();
        const wrapper = mount(<FieldBase {...defaultProps} onBlur={spy} />);
        wrapper.setProps({ shouldReset: true });
        expect(spy.called).to.equal(true);
      })
    );

    describe('isLoading', () => {
      it('should render Spinner', () => {
        const wrapper = shallow(<FieldBase {...defaultProps} isLoading />);
        expect(wrapper.find(Spinner).length).to.equals(1);
        wrapper.setProps({ isLoading: false });
        expect(wrapper.find(Spinner).length).to.equals(0);
      });

      describe('and isInvalid', () =>
        it('should not render Spinner', () => {
          const wrapper = shallow(<FieldBase {...defaultProps} isLoading isInvalid />);
          expect(wrapper.find(Spinner).length).to.equals(0);
        })
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

  describe('smart component', () => {
    it('should call onFocus hanlder', () => {
      const spy = sinon.spy();
      const wrapper = mount(<FieldBaseSmart onFocus={spy} />);
      wrapper.find(`.${contentClass}`).simulate('focus');
      expect(spy.callCount).to.equal(1);
    });

    it('should call onBlur hanlder', () => {
      const spy = sinon.spy();
      const wrapper = mount(<FieldBaseSmart onBlur={spy} />);
      wrapper.find(`.${contentClass}`).simulate('blur');
      expect(spy.callCount).to.equal(1);
    });
  });
});
