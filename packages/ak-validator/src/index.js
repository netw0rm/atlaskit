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
 * @param {Object=} props Properties that should be defined on the validator component
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
 */
const ValidatorMinLength = defineValidator(`${prefix}min-length`,
  function validate(value) { return value.length >= this.minLength; },
  { minLength: prop.number({}) }
);
/**
 * @description Maximum length validator.
 * @class ValidatorMaxLength
 * @example @js import ValidatorMaxLength from 'ak-validator';
 * const myValidator = new ValidatorMaxLength();
 */
const ValidatorMaxLength = defineValidator(`${prefix}max-length`,
  function validate(value) { return value.length <= this.maxLength; },
  { maxLength: prop.number({}) }
);
/**
 * @description Required validator.
 * @class ValidatorRequired
 * @example @js import ValidatorRequired from 'ak-validator';
 * const myValidator = new ValidatorRequired();
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
