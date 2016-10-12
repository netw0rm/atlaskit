import { define } from 'skatejs';
import ValidatorBase from './internal/validator-base';

/**
 * @description Validator function that returns whether a value is valid.
 * @see defineValidator
 * @callback validatorFunction
 * @param value The value to validate
 * @param elem The validator element
 */

/**
 * @description Factory function to define a new validator component
 * @param {string} tagName The tag name for the new validator component.
 * @param {validatorFunction} validatorFunction A function that returns whether the value is valid
 * @param {Object} [props] Any additional properties that should be available to the component.
 * See https://github.com/skatejs/skatejs#props for more information.
 */
function defineValidator(tagName, validatorFunction = (() => true), props = {}) {
  return define(tagName, class extends ValidatorBase {
    validate(value) {
      return !(this.invalid = !validatorFunction(value, this));
    }
    static get props() {
      return Object.assign(super.props, props);
    }
  });
}

export default defineValidator;
