import React from 'react';
import { shallow, mount } from 'enzyme';
import Base from '@atlaskit/field-base';

import FieldText, { FieldTextStateless } from '../../src';
import Input from '../../src/styled/Input';

describe('FieldTextStateless', () => {
  // Stub window.cancelAnimationFrame, so Popper (used in Layer) doesn't error when accessing it.
  const animStub = window.cancelAnimationFrame;
  beforeEach(() => {
    window.cancelAnimationFrame = () => {};
  });

  afterEach(() => {
    window.cancelAnimationFrame = animStub;
  });

  it('defaults', () => {
    const wrapper = shallow(<FieldTextStateless />);
    expect(wrapper.find(Base).length).toBe(1);
    expect(wrapper.find(Input).length).toBe(1);
  });

  describe('properties', () => {
    describe('compact prop', () => {
      it('should reflect its value to the FieldBase', () => {
        expect(shallow(<FieldTextStateless compact />).find(Base).props().isCompact).toBe(true);
      });
    });

    describe('disabled prop', () => {
      it('should reflect its value to the FieldBase', () => {
        expect(
          shallow(<FieldTextStateless disabled />).find(Base).props().isDisabled
        ).toBe(true);
      });
    });

    describe('isReadOnly prop', () => {
      describe('set to true', () => {
        it('should sets its value on the input', () => {
          expect(mount(<FieldText isReadOnly />).find('input').props().readOnly).toBe(true);
        });

        it('should reflect its value to the FieldBase', () => {
          expect(mount(<FieldText isReadOnly />).find(Base).props().isReadOnly).toBe(true);
        });
      });

      describe('set to false', () => {
        it('should sets its value on the input', () => {
          expect(mount(<FieldText />).find('input').props().readOnly).toBe(false);
        });

        it('should reflect its value to the FieldBase', () => {
          expect(mount(<FieldText />).find(Base).props().isReadOnly).toBe(false);
        });
      });
    });

    describe('required prop', () => {
      it('should reflect its value to the FieldBase', () => {
        expect(
          shallow(<FieldTextStateless required />).find(Base).props().isRequired
        ).toBe(true);
      });
    });

    describe('isInvalid prop', () => {
      it('should reflect its value to the FieldBase', () => {
        expect(
          shallow(<FieldTextStateless isInvalid />).find(Base).props().isInvalid
        ).toBe(true);
      });
    });

    describe('spellCheck prop', () => {
      it('should render an input with a spellCheck prop', () => {
        expect(shallow(<FieldTextStateless isSpellCheckEnabled />)
          .find(Input).props().spellCheck).toBe(true);
      });
    });

    describe('invalidMessage prop', () => {
      it('should reflect its value to the FieldBase', () => {
        expect(shallow(<FieldTextStateless invalidMessage="test" />).find(Base).props().invalidMessage).toBe('test');
      });
    });

    describe('native input attributes should be reflected to input element', () => {
      [
        ['type', 'search'],
        ['disabled', true],
        ['name', 'test'],
        ['placeholder', 'test placeholder'],
        ['maxLength', 5],
        ['min', 1],
        ['max', 10],
        ['required', true],
        ['autoComplete', 'on'],
        ['form', 'my-form'],
        ['pattern', '/.+/'],
      ].forEach(([prop, propValue]) => {
        it(prop, () => {
          expect(shallow(
            <FieldTextStateless {...{ [prop]: propValue }} />
          ).find(Input).prop(prop)).toBe(propValue);
        });
      });
    });

    describe('native input events', () => {
      [
        'onBlur',
        'onChange',
        'onFocus',
        'onKeyDown',
        'onKeyPress',
        'onKeyUp',
      ].forEach(inputEvent => {
        it(inputEvent, () => {
          const eventSpy = jest.fn();
          const wrapper = shallow(
            <FieldTextStateless {...{ [inputEvent]: eventSpy }} />
          );
          const input = wrapper.find(Input);
          expect(input.prop(inputEvent)).toBe(eventSpy);

          const simulateEvent = inputEvent.replace(/^on/, '').toLowerCase();
          input.simulate(simulateEvent);

          expect(eventSpy).toHaveBeenCalledTimes(1);
        });
      });
    });

    it('Input should have value="something"', () =>
      expect(shallow(<FieldTextStateless value="something" />).find(Input).prop('value'))
        .toBe('something')
    );

    it('onChange should be called when input value changes', () => {
      const spy = jest.fn();
      const wrapper = mount(<FieldTextStateless onChange={spy} />);
      wrapper.find(Input).simulate('change');
      expect(spy).toHaveBeenCalledTimes(1);
    });
  });

  describe('FieldText', () => {
    it('should call onChange when input value changes', () => {
      const spy = jest.fn();
      const wrapper = mount(<FieldText onChange={spy} />);
      wrapper.find(Input).simulate('change');
      expect(spy).toHaveBeenCalledTimes(1);
    });
  });

  describe('FieldText input focus', () => {
    it('should get focus when focus() is called', () => {
      const focusSpy = jest.fn();
      const wrapper = mount(<FieldText onFocus={focusSpy} />);

      // The onFocus prop doesn't actualy get fired by enzyme for some reason, so attaching
      // the spy directly to the input.
      wrapper.find('input').getDOMNode().addEventListener('focus', focusSpy);

      expect(focusSpy).toHaveBeenCalledTimes(0);
      wrapper.instance().focus();
      expect(focusSpy).toHaveBeenCalledTimes(1);
    });
  });
});
