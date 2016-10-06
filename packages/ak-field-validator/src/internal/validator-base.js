import { vdom, prop, Component } from 'skatejs';

/**
 * The base class definition for a validator component.
 */
class ValidatorBase extends Component {
  static get props() {
    return { valid: prop.boolean({ attribute: true }) };
  }
  static render() {
    return (<slot />);
  }
}

export default ValidatorBase;
