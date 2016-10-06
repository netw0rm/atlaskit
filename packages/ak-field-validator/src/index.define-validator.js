import { define, vdom } from 'skatejs';
import ValidatorBase from './internal/validator-base';

/**
 * @callback validatorFunction
 * @param value The value to validate
 * @param elem The validator element
 */

/**
 * @callback defaultMessageFunction
 * @param elem The validator element
 */

/**
 * Define a new validator component
 * @param {string} tagName The
 * @param {validatorFunction} validatorFunction A function that returns whether the value is valid
 * @param {Object=} props Any additional properties that should be available to the component.
 * See https://github.com/skatejs/skatejs#props for more information.
 * @param {defaultMessageFunction=} defaultMessage A function that returns the default message
 * @returns {*}
 */
function defineValidator(tagName, validatorFunction, props = {}, defaultMessage) {
  return define(tagName, class extends ValidatorBase {
    validate(value) {
      return (this.valid = validatorFunction(value, this));
    }
    static get props() {
      return Object.assign(super.props, props || {});
    }
    static render(elem) {
      return (<slot>{defaultMessage && defaultMessage(elem)}</slot>);
    }
  });
}

export default defineValidator;
