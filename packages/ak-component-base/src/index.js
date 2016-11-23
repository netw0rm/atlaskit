/** @jsx vdom */

/**
 * @description returns the ComponentBase class built using the injected `Component` and `prop`
 * dependencies.
 * @param {Object} dependencies An object with the dependencies required to create the ComponentBase
 * class to ensure that it is compatible with other classes you may build on top of it.
 * @param {Component} dependencies.Component The base component class to extend ComponentBase from.
 * @param {function} dependencies.prop The prop function used for creating new props
 * @example @js import { Component, prop } from 'skatejs';
 * import base from 'ak-component-base';
 *
 * const Base = base({Component, prop});
 * @returns {ComponentBase}
 */
export default function base({ Component, prop }) {
  const override = prop.create({
    set(elem, data) {
      Object.assign(elem, data.newValue || {});
    },
  });
  /**
  * @description A component for adding the `override` functionality to other components.
  * @class ComponentBase
 */
  return class extends Component {
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
  };
}
