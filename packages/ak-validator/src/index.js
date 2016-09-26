import 'style!./host.less';
import { define, prop } from 'skatejs';

const prefix = 'ak-validator-';

const baseDefinition = {
  props: {
    val: {},
  },
  message: prop.string({}),
};

/**
 * The validator function should take the value of the input and return whether it is valid or not.
 *
 * @callback validatorFunction
 * @param value The input value to be validated
 */

/**
 * Define a new validator component.
 * @param {string} tagName The tag name of the new validator component.
 * @param {validatorFunction} validatorFunction The validator function
 * @param {Object=} props Any properties that should be
 * @returns {*}
 */
const defineValidator = (tagName, validatorFunction, props = {}) => {
  const newDefinition = Object.assign({
    props,
    prototype: { validate: validatorFunction },
  }, baseDefinition);

  return define(tagName, newDefinition);
};

const ValidatorMinLength = defineValidator(`${prefix}min-length`,
  (value) => (value.length > this.minLength),
  { minLength: prop.number({}) }
);

const ValidatorMaxLength = defineValidator(`${prefix}max-length`,
  (value) => (value.length > this.maxLength),
  { maxLength: prop.number({}) }
);

const ValidatorRequired = defineValidator(`${prefix}required`, {}, (value) => !!value);

export default defineValidator;

export {
  ValidatorMinLength,
  ValidatorMaxLength,
  ValidatorRequired,
};
