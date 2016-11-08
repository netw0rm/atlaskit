import { vdom, prop, Component } from 'skatejs';

/**
 * Generate the styles to hide the component.
 * We need to do this because browsers with the polyfill cannot use the :host style, so we need to
 * generate the style using the tagName.
 */
function generateStyles(tagName) {
  return `
    ${tagName.toLowerCase()} {
      display: list-item;
    }
    ${tagName.toLowerCase()}:not([defined]),
    ${tagName.toLowerCase()}:not([invalid]) {
      display: none;
    }
    :host {
      display: list-item;
    }
    :host(:not([defined])),
    :host(:not([invalid])) {
      display: none;
    }
  `;
}

/**
 * The base class definition for a validator component.
 */
class ValidatorBase extends Component {
  static get props() {
    return { invalid: prop.boolean({ attribute: true }) };
  }
  static render(elem) {
    return ([
      <style>{generateStyles(elem.tagName)}</style>,
      <slot />,
    ]);
  }
  /**
   * Perform validation on a value based on the supplied validator function.
   * @param value The value to validate
   */
  validate(value) {
    return !(this.invalid = !this.validatorFunction(value, this));
  }
  /**
   * The validator function that should be overriden when this class is extended.
   * @param value The value to validate
   */
  validatorFunction(value) {  // eslint-disable-line class-methods-use-this,no-unused-vars
    return false;
  }
}

export default ValidatorBase;
