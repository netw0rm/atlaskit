import 'style!./host.less';
import { define, prop } from 'skatejs';

const prefix = 'ak-validator-';

const baseProps = { message: prop.string({}) };

/**
 * The validator function should take the value of the input and return whether it is valid or not.
 *
 * @callback validatorFunction
 * @param value The input value to be validated
 */

/**
 * Define a new validator component.
 * @param {string} tagName The tag name of the new validator component
 * @param {validatorFunction} validatorFunction The validator function
 * @param {Object=} props The properties that should be defined on the validator component
 * @returns {*}
 */
const defineValidator = (tagName, validatorFunction, props = {}) => {
  const newDefinition = {
    props: Object.assign(baseProps, props),
    prototype: { validate: validatorFunction },
  };

  return define(tagName, newDefinition);
};

/**
 * @description Minimum length validator.
 * @class ValidatorMinLength
 * @example @js import ValidatorMinLength from 'ak-validator';
 * const myValidator = new ValidatorMinLength();
 * @example @js
 * <ak-validator-min-length
 *   min-length="5"
 *   message="Must have at least 5 characters"
 *   slot="validator"
 * ></ak-validator-min-length>
 */
const ValidatorMinLength = defineValidator(`${prefix}min-length`,
  function validate(value) { return value.length >= this.minLength; },
  {
    /**
     * @description The minimum length of the value
     * @memberof ValidatorMinLength
     * @instance
     * @type {number}
     */
    minLength: prop.number({}),
  }
);
/**
 * @description Maximum length validator.
 * @class ValidatorMaxLength
 * @example @js import ValidatorMaxLength from 'ak-validator';
 * const myValidator = new ValidatorMaxLength();
 * @example @js
 * <ak-validator-max-length
 *   min-length="10"
 *   message="Must have at most 10 characters"
 *   slot="validator"
 * ></ak-validator-max-length>
 */
const ValidatorMaxLength = defineValidator(`${prefix}max-length`,
  function validate(value) { return value.length <= this.maxLength; },
  {
    /**
     * @description The maximum length of the value
     * @memberof ValidatorMaxLength
     * @instance
     * @type {number}
     */
    maxLength: prop.number({}),
  }
);
/**
 * @description Required validator.
 * @class ValidatorRequired
 * @example @js import ValidatorRequired from 'ak-validator';
 * const myValidator = new ValidatorRequired();
 * @example @js
 * <ak-validator-required
 *   message="This field is required"
 *   slot="validator"
 * ></ak-validator-required>
 */
const ValidatorRequired = defineValidator(`${prefix}required`,
  (value) => !!value
);

export default defineValidator;

export {
  ValidatorMinLength,
  ValidatorMaxLength,
  ValidatorRequired,
};
