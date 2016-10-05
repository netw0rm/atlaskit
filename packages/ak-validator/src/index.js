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
 * @class ValidatorMinlength
 * @example @js import ValidatorMinlength from 'ak-validator';
 * const myValidator = new ValidatorMinlength();
 * @example @js
 * <ak-validator-minlength minlength="5" slot="validator">
 *   Must have at least 5 characters
 * </ak-validator-minlength>
 */
const ValidatorMinlength = define(`${prefix}minlength`, ValidatorBase.extend({
  prototype: {
    validate(value) {
      return value.length >= this.minlength;
    },
  },
  props: {
    /**
     * @description The minimum length of the value
     * @memberof ValidatorMinlength
     * @instance
     * @type {number}
     * @default 1
     */
    minlength: prop.number({
      attribute: true,
      default: 1,
    }),
  },
  render(elem) {
    return (<slot>
      Field should have at least {elem.minlength} character{elem.minlength > 1 && 's'}
    </slot>);
  },
}));

/**
 * @description Maximum length validator.
 * @class ValidatorMaxlength
 * @example @js import ValidatorMaxlength from 'ak-validator';
 * const myValidator = new ValidatorMaxlength();
 * @example @js
 * <ak-validator-maxlength maxlength="10" slot="validator">
 *   Must have at most 10 characters
 * </ak-validator-maxlength>
 */
const ValidatorMaxlength = define(`${prefix}maxlength`, ValidatorBase.extend({
  prototype: {
    validate(value) {
      return value.length <= this.maxlength;
    },
  },
  props: {
    /**
     * @description The maximum length of the value
     * @memberof ValidatorMaxlength
     * @instance
     * @type {number}
     * @default 10
     */
    maxlength: prop.number({
      attribute: true,
      default: 10,
    }),
  },
  render(elem) {
    return (<slot>
      Field should have at most {elem.maxlength} character{elem.maxlength > 1 && 's'}
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
  ValidatorMinlength,
  ValidatorMaxlength,
  ValidatorRequired,
};
