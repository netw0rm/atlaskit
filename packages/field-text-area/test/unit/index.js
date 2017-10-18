import React from 'react';
import { shallow, mount } from 'enzyme';
import Base from '@atlaskit/field-base';

import FieldTextArea, { FieldTextAreaStateless } from '../../src';
import TextArea from '../../src/styled/TextArea';

describe('FieldTextAreaStateless', () => {
  // Stub window.cancelAnimationFrame, so Popper (used in Layer) doesn't error when accessing it.
  const animStub = window.cancelAnimationFrame;
  beforeEach(() => {
    window.cancelAnimationFrame = () => {};
  });

  afterEach(() => {
    window.cancelAnimationFrame = animStub;
  });

  it('defaults', () => {
    const wrapper = shallow(<FieldTextAreaStateless />);
    expect(wrapper.find(Base).length).toBe(1);
    expect(wrapper.find(TextArea).length).toBe(1);
  });

  describe('properties', () => {
    describe('compact prop', () => {
      it('should reflect its value to the FieldBase', () => {
        expect(shallow(<FieldTextAreaStateless compact />).find(Base).props().isCompact).toBe(true);
      });
    });

    describe('disabled prop', () => {
      it('should reflect its value to the FieldBase', () => {
        expect(
          shallow(<FieldTextAreaStateless disabled />).find(Base).props().isDisabled
        ).toBe(true);
      });
    });

    describe('isReadOnly prop', () => {
      describe('set to true', () => {
        it('should sets its value on the input', () => {
          expect(mount(<FieldTextArea isReadOnly />).find('textarea').props().readOnly).toBe(true);
        });

        it('should reflect its value to the FieldBase', () => {
          expect(mount(<FieldTextArea isReadOnly />).find(Base).props().isReadOnly).toBe(true);
        });
      });

      describe('set to false', () => {
        it('should sets its value on the input', () => {
          expect(mount(<FieldTextArea />).find('textarea').props().readOnly).toBe(false);
        });

        it('should reflect its value to the FieldBase', () => {
          expect(mount(<FieldTextArea />).find(Base).props().isReadOnly).toBe(false);
        });
      });
    });

    describe('required prop', () => {
      it('should reflect its value to the FieldBase', () => {
        expect(
          shallow(<FieldTextAreaStateless required />).find(Base).props().isRequired
        ).toBe(true);
      });
    });

    describe('isInvalid prop', () => {
      it('should reflect its value to the FieldBase', () => {
        expect(
          shallow(<FieldTextAreaStateless isInvalid />).find(Base).props().isInvalid
        ).toBe(true);
      });
    });

    describe('spellCheck prop', () => {
      it('should render an input with a spellCheck prop', () => {
        expect(shallow(<FieldTextAreaStateless isSpellCheckEnabled />)
          .find(TextArea).props().spellCheck).toBe(true);
      });
    });

    describe('invalidMessage prop', () => {
      it('should reflect its value to the FieldBase', () => {
        expect(shallow(<FieldTextAreaStateless invalidMessage="test" />).find(Base).props().invalidMessage).toBe('test');
      });
    });

    [
      { disabled: true },
      { name: 'test' },
      { placeholder: 'test placeholder' },
      { maxLength: 5 },
      { required: true },
    ].forEach(prop =>
      describe(JSON.stringify(prop), () =>
        it('TextArea should have attribute defined', () => {
          const key = Object.keys(prop)[0];
          const value = prop[key];
          expect(shallow(<FieldTextAreaStateless {...prop} />)
            .find(TextArea)
            .prop(key))
            .toBe(value);
        })
      )
    );

    it('TextArea should have value="something"', () =>
      expect(shallow(<FieldTextAreaStateless value="something" />).find(TextArea).prop('value'))
        .toBe('something')
    );

    it('onChange should be called when input value changes', () => {
      const spy = jest.fn();
      const wrapper = mount(<FieldTextAreaStateless onChange={spy} />);
      wrapper.find(TextArea).simulate('change');
      expect(spy).toHaveBeenCalledTimes(1);
    });
  });

  describe('FieldTextArea', () => {
    it('should call onChange when input value changes', () => {
      const spy = jest.fn();
      const wrapper = mount(<FieldTextArea onChange={spy} />);
      wrapper.find(TextArea).simulate('change');
      expect(spy).toHaveBeenCalledTimes(1);
    });
  });

  describe('FieldTextArea input focus', () => {
    it('should get focus when focus() is called', () => {
      let hasFocus = 0;
      const wrapper = mount(<FieldTextArea />);
      wrapper.getDOMNode().addEventListener('focus', () => {
        hasFocus = 1;
      }, true);
      wrapper.instance().focus();

      expect(hasFocus).toBe(1);
    });
  });
});
