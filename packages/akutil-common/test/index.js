import { name } from '../';
import * as exports from '../src';
import {
    computeBooleanValue, setBooleanAttribute,
    computeEnumValue, setEnumAttribute,
} from '../src/attributes';

// TODO move these tests into separate files and give them appropriate names.

const TRUTHY_VALUES = [true, 1, 'true', 'false'];
const FALSY_VALUES = [false, 0, '', null, undefined];

function describeValue(value) {
  return `'${value}': ${typeof value}`;
}

describe(name, () => {
  it('named exports', () => {
    expect(exports.enumeration).to.be.a('function', 'enumeration');
    expect(exports.keyCode).to.be.an('function', 'keyCode');
    expect(exports.KeyPressHandler).to.be.a('function', 'KeyPressHandler');
    expect(exports.style).to.be.a('function', 'style');
  });

  describe('aui/internal/attributes', () => {
    const ATTRIBUTE = 'foo';

    let el;
    let setAttributeSpy;
    let removeAttributeSpy;
    beforeEach(() => {
      el = document.createElement('div');
      setAttributeSpy = sinon.spy(el, 'setAttribute');
      removeAttributeSpy = sinon.spy(el, 'removeAttribute');
    });

    describe('computeBooleanValue', () => {
      it('returns false for null', () => {
        expect(computeBooleanValue(null)).to.equal(false);
      });

      it('returns true for non-null falsy values', () => {
        const nonNullFalsyValues = FALSY_VALUES.filter(value => value !== null);
        nonNullFalsyValues.forEach((value) => {
          expect(computeBooleanValue(value)).to.equal(true, describeValue(value));
        });
      });
    });

    describe('computeBooleanValue for attr absent', () => {
      it('matches hasAttribute', () => {
        expect(
          computeBooleanValue(el.getAttribute(ATTRIBUTE))
        ).to.equal(el.hasAttribute(ATTRIBUTE));
      });
    });

    describe('computeBooleanValue for attr present', () => {
      const nonNullValues = TRUTHY_VALUES.concat(FALSY_VALUES).filter(value => value !== null);

      nonNullValues.forEach((value) => {
        beforeEach(() => {
          el.setAttribute(ATTRIBUTE, value);
          setAttributeSpy.reset();
        });

        it(`matches hasAttribute (${describeValue(value)})`, () => {
          expect(computeBooleanValue(el.getAttribute(ATTRIBUTE)))
            .to.equal(el.hasAttribute(ATTRIBUTE));
        });
      });
    });

    function itRemovesTheBooleanAttributeWhenPropertySetToBeFalsy() {
      FALSY_VALUES.forEach((value) => {
        it(`removes the attr for falsy values (${describeValue(value)})`, () => {
          setBooleanAttribute(el, ATTRIBUTE, value);
          expect(el.hasAttribute(ATTRIBUTE)).to.equal(false, 'hasAttribute');
          expect(removeAttributeSpy.callCount).to.equal(1, 'removeAttribute');
        });
      });
    }

    function itSetsTheAttributeToEmptyWhenPropertySetToTruthy() {
      TRUTHY_VALUES.forEach((value) => {
        it(`adds the attr for truthy values (${describeValue(value)})`, () => {
          setBooleanAttribute(el, ATTRIBUTE, value);
          expect(el.getAttribute(ATTRIBUTE)).to.equal('', 'getAttribute');
          expect(setAttributeSpy.callCount).to.equal(1, 'removeAttribute');
        });
      });
    }

    describe('setBooleanAttribute for attr absent', () => {
      itRemovesTheBooleanAttributeWhenPropertySetToBeFalsy();
      itSetsTheAttributeToEmptyWhenPropertySetToTruthy();
    });


    describe('setBooleanAttribute for attr present and empty', () => {
      beforeEach(() => {
        el.setAttribute(ATTRIBUTE, '');
        setAttributeSpy.reset();
      });

      itRemovesTheBooleanAttributeWhenPropertySetToBeFalsy();
      itSetsTheAttributeToEmptyWhenPropertySetToTruthy();
    });

    describe('setBooleanAttribute for attr present and non-empty', () => {
      beforeEach(() => {
        el.setAttribute(ATTRIBUTE, ATTRIBUTE);
        setAttributeSpy.reset();
      });

      itRemovesTheBooleanAttributeWhenPropertySetToBeFalsy();

      TRUTHY_VALUES.forEach((value) => {
        it(`normalizes the attr for truthy values (${describeValue(value)})`, () => {
          setBooleanAttribute(el, ATTRIBUTE, value);
          expect(el.getAttribute(ATTRIBUTE)).to.equal('', 'getAttribute');
        });
      });
    });


    function computeEnumValueMatchesValuesCaseInsensitive(enumOptions) {
      it('matches values case-insensitive', () => {
        enumOptions.values.forEach((value) => {
          const computedValue = computeEnumValue(enumOptions, value.toUpperCase());
          expect(computedValue).to.equal(value, describeValue(value));
        });
      });
    }

    describe('enum without defaults', () => {
      const ENUM_OPTIONS = {
        attribute: ATTRIBUTE,
        values: ['foo', 'bar'],
      };

      computeEnumValueMatchesValuesCaseInsensitive(ENUM_OPTIONS);

      it('computeEnumValue returns null when missing', () => {
        expect(computeEnumValue(ENUM_OPTIONS, null)).to.equal(null);
      });

      it('setEnumAttribute sets the value as-is, even if there is a case-insensitive match', () => {
        ENUM_OPTIONS.values.forEach((value) => {
          const upperCasedValue = value.toUpperCase();
          setEnumAttribute(el, ENUM_OPTIONS, upperCasedValue);
          expect(el.getAttribute(ENUM_OPTIONS.attribute)).to.equal(upperCasedValue,
            describeValue(upperCasedValue));
        });
      });

      it('setEnumAttribute sets the attribute even if it is aleady exactly the new value', () => {
        el.setAttribute(ENUM_OPTIONS.attribute, 'foo');
        setAttributeSpy.reset();

        setEnumAttribute(el, ENUM_OPTIONS, 'foo');
        expect(el.getAttribute(ENUM_OPTIONS.attribute)).to.equal('foo', 'getAttribute');
        expect(setAttributeSpy.callCount).to.equal(1, 'setAttribute');
      });

      it('setEnumAttribute passes the new value verbatim to setAttribute', () => {
        FALSY_VALUES.forEach((value) => {
          setAttributeSpy.reset();

          setEnumAttribute(el, ENUM_OPTIONS, value);
          expect(setAttributeSpy.callCount).to.equal(1, `setAttribute (${describeValue(value)})`);
          expect(setAttributeSpy.calledWithExactly(ENUM_OPTIONS.attribute, value)).to.equal(true,
            `calledWith (${describeValue(value)}`);
        });
      });

      it('setEnumAttribute does not remove the attribute for null', () => {
        el.setAttribute(ENUM_OPTIONS.attribute, 'foo');
        setAttributeSpy.reset();

        setEnumAttribute(el, ENUM_OPTIONS, null);
        expect(removeAttributeSpy.callCount).to.equal(0);
      });
    });

    describe('enum with missing default', () => {
      const ENUM_OPTIONS = {
        attribute: ATTRIBUTE,
        values: ['foo', 'bar'],
        missingDefault: 'missing-default',
      };

      computeEnumValueMatchesValuesCaseInsensitive(ENUM_OPTIONS);

      it('computeEnumValue returns the missing default when missing', () => {
        expect(computeEnumValue(ENUM_OPTIONS, null)).to.equal(ENUM_OPTIONS.missingDefault);
      });

      it('computeEnumValue returns the missing default when invalid', () => {
        expect(computeEnumValue(ENUM_OPTIONS, 'invalid')).to.equal(ENUM_OPTIONS.missingDefault);
      });
    });

    describe('enum with missing and invalid defaults', () => {
      const ENUM_OPTIONS = {
        attribute: ATTRIBUTE,
        values: ['foo', 'bar'],
        missingDefault: 'missing-default',
        invalidDefault: 'invalid-default',
      };

      computeEnumValueMatchesValuesCaseInsensitive(ENUM_OPTIONS);

      it('computeEnumValue returns the missing default when missing', () => {
        expect(computeEnumValue(ENUM_OPTIONS, null)).to.equal(ENUM_OPTIONS.missingDefault);
      });

      it('computeEnumValue returns the invalid default when invalid', () => {
        expect(computeEnumValue(ENUM_OPTIONS, 'invalid')).to.equal(ENUM_OPTIONS.invalidDefault);
      });

      it('computeEnumValue does not match against the missing default', () => {
        const computedValue = computeEnumValue(ENUM_OPTIONS, ENUM_OPTIONS.missingDefault);
        expect(computedValue).to.equal(ENUM_OPTIONS.invalidDefault);
      });
    });
  });
});
