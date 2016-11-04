import { vdom, prop, Component } from 'skatejs';
import shadowStyles from '../shadow.less';

/**
 * The base class definition for a validator component.
 */
class ValidatorBase extends Component {
  static get props() {
    return { invalid: prop.boolean({ attribute: true }) };
  }
  static render() {
    return ([
      <style>{shadowStyles.toString()}</style>,
      <slot />,
    ]);
  }
}

export default ValidatorBase;
