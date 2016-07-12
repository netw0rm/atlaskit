/** @jsx vdom */
import 'style!./host.less'; // eslint-disable-line import/no-unresolved

import { emit, vdom } from 'skatejs';
import shadowStyles from './shadow.less';

/**
 * @description The definition for the component.
 * @class MyComponent
 * @example @html <my-component></my-component>
 * @example @js import MyComponent from 'ak-component-name';
 * const myComponent = new MyComponent();
 */
const definition = {
  render(elem) {
    return (
      // JSX requires that there only be a single root element.
      // Incremental DOM doesn't require this.
      <div>
        {/* This is required for elements in the shadow root to be styled.
           This is wrapped in the <div /> because you can't have more than one
           root element.
        */}
        <style>{shadowStyles.toString()}</style>
        <p className={shadowStyles.locals.myClassName}>I am an {elem.tagName} element!</p>
      </div>
    );
  },
  props: {
    /**
     * @description Description of myProperty
     * @memberof MyComponent
     * @instance
     * @type {string}
     */
    myProperty: {},
  },
  prototype: {
    /**
     * @description Description for myMethod method.
     * @memberof MyComponent
     * @function
     * @instance
     * @fires MyComponent#my-event
     * @return {MyComponent} The MyComponent element.
     * @example @js myComponent.myMethod(); // Fires the my-event event.
     */
    myMethod() {
      /**
       * @event MyComponent#my-event
       * @memberof MyComponent
       * @description Description of 'my-event'
       * @property {String} detail.tag The tagName of the component.
       */
      emit(this, 'my-event', {
        detail: {
          tag: this.tagName,
        },
      });
      return this;
    },
  },
};

export default definition;
