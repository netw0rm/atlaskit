import { vdom, prop, Component } from 'skatejs';

/**
 * Generate the styles to hide the component.
 * We need to do this because browsers with the polyfill cannot use the :host style, so we need to
 * generate the style using the tagName.
 */
function generateStyles(tagName) {
  return `
    ${tagName.toLowerCase()}:not([defined]),
    ${tagName.toLowerCase()}:not([invalid]) {
      display: none;
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
}

export default ValidatorBase;
