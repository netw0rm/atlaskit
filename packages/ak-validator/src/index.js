import 'style!./host.less';
import { define, vdom, prop, Component } from 'skatejs';

const prefix = 'ak-validator-';

/**
 * The base class definition for a validator component.
 */
const ValidatorBase = Component.extend({
  render() {
    return (<slot />);
  },
});

/**
 * @description Minimum length validator.
 * @class ValidatorMinLength
 * @example @js import ValidatorMinLength from 'ak-validator';
 * const myValidator = new ValidatorMinLength();
 * @example @js
 * <ak-validator-min-length min-length="5" slot="validator">
 *   Must have at least 5 characters
 * </ak-validator-min-length>
 */
const ValidatorMinLength = define(`${prefix}min-length`, ValidatorBase.extend({
  prototype: {
    validate(value) {
      return value.length >= this.minLength;
    },
  },
  props: {
    /**
     * @description The minimum length of the value
     * @memberof ValidatorMinLength
     * @instance
     * @type {number}
     * @default 1
     */
    minLength: prop.number({
      attribute: true,
      default: 1,
    }),
  },
  render(elem) {
    return (<slot>
      Field should have at least {elem.minLength} character{elem.minLength > 1 && 's'}
    </slot>);
  },
}));

/**
 * @description Maximum length validator.
 * @class ValidatorMaxLength
 * @example @js import ValidatorMaxLength from 'ak-validator';
 * const myValidator = new ValidatorMaxLength();
 * @example @js
 * <ak-validator-max-length min-length="10" slot="validator">
 *   Must have at most 10 characters
 * </ak-validator-max-length>
 */
const ValidatorMaxLength = define(`${prefix}max-length`, ValidatorBase.extend({
  prototype: {
    validate(value) {
      return value.length <= this.maxLength;
    },
  },
  props: {
    /**
     * @description The maximum length of the value
     * @memberof ValidatorMaxLength
     * @instance
     * @type {number}
     * @default 10
     */
    maxLength: prop.number({
      attribute: true,
      default: 10,
    }),
  },
  render(elem) {
    return (<slot>
      Field should have at most {elem.maxLength} character{elem.maxLength > 1 && 's'}
    </slot>);
  },
}));

/**
 * @description Required validator.
 * @class ValidatorRequired
 * @example @js import ValidatorRequired from 'ak-validator';
 * const myValidator = new ValidatorRequired();
 * @example @js
 * <ak-validator-required slot="validator">
 *   This field is required
 * </ak-validator-required>
 */
const ValidatorRequired = define(`${prefix}required`, ValidatorBase.extend({
  prototype: {
    validate(value) {
      return !!value;
    },
  },
  render() {
    return (<slot>
      Field is required
    </slot>);
  },
}));

export {
  ValidatorBase,
  ValidatorMinLength,
  ValidatorMaxLength,
  ValidatorRequired,
};
