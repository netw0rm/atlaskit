import { define, prop } from 'skatejs';
import ValidatorBase from './internal/validator-base';

const prefix = 'ak-field-validator-';

/**
 * @description Minimum length validator.
 * @class ValidatorMinlength
 * @example @js import ValidatorMinlength from 'ak-field-validator';
 * const myValidator = new ValidatorMinlength();
 * @example @js
 * <ak-field-validator-minlength minlength="5" slot="validator-slot">
 *   Must have at least 5 characters
 * </ak-field-validator-minlength>
 */
const ValidatorMinlength = define(`${prefix}minlength`, class extends ValidatorBase {
  static get props() {
    return {
      ...super.props,
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
    };
  }
  validatorFunction(value) {
    return value.length >= this.minlength;
  }
});

/**
 * @description Maximum length validator.
 * @class ValidatorMaxlength
 * @example @js import ValidatorMaxlength from 'ak-field-validator';
 * const myValidator = new ValidatorMaxlength();
 * @example @js
 * <ak-field-validator-maxlength maxlength="10" slot="validator-slot">
 *   Must have at most 10 characters
 * </ak-field-validator-maxlength>
 */
const ValidatorMaxlength = define(`${prefix}maxlength`, class extends ValidatorBase {
  static get props() {
    return {
      ...super.props,
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
    };
  }
  validatorFunction(value) {
    return value.length <= this.maxlength;
  }
});

/**
 * @description Required validator.
 * @class ValidatorRequired
 * @example @js import ValidatorRequired from 'ak-field-validator';
 * const myValidator = new ValidatorRequired();
 * @example @js
 * <ak-field-validator-required slot="validator-slot">
 *   This field is required
 * </ak-field-validator-required>
 */
const ValidatorRequired = define(`${prefix}required`, class extends ValidatorBase {
  validatorFunction(value) { // eslint-disable-line class-methods-use-this
    return !!value;
  }
});

export {
  ValidatorBase,
  ValidatorMinlength,
  ValidatorMaxlength,
  ValidatorRequired,
};
