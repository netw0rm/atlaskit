import { define, prop, Component } from 'skatejs';

const override = prop.create({
  set(elem, data) {
    Object.assign(elem, data.newValue || {});
  },
});

/**
 * @description A component for adding the `override` functionality to other components.
 * @class ComponentBase
 */
const Base = define('ak-component-base', class extends Component {
  static get props() {
    return {
      /**
       * @description Overrides for any props that you wish to not be controlled by the component
       *              itself.
       *
       * For instance, if a component has a `state` prop that it manages and
       *              changes by itself and you wish to own that state, you could track and manage
       *              your own copy of that state and pass it in through `override`.
       *              This will prevent the component from ever overriding your value.
       * @memberof ComponentBase
       * @default undefined
       * @type {Object}
       * @example @html <ak-component override={{ state: myInternalState }}></ak-component>
       * @example @js component.override = { state: myInternalState };
       */
      override: override(),
    };
  }
  static updated(elem, prev) {
    Object.assign(elem, elem.override || {});
    return super.updated(elem, prev);
  }
});

export default Base;
