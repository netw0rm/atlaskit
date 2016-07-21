/** @jsx vdom */
import 'style!../host.less';

import { emit, vdom, define } from 'skatejs';
import shadowStyles from '../shadow.less';

/**
 * @description Create instances of the component programmatically, or using markup.
 * @class Tab
 * @example @js import Tab from 'ak-tab';
 * const component = new Tab();
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
        <p className={shadowStyles.locals.myClassName}>My name is {elem.name}!</p>
      </div>
    );
  },
  props: {
    /**
     * @description The name of the Tab element.
     * @memberof Tab
     * @instance
     * @type {string}
     * @default Tab
     */
    tabname: {
      default: 'Tab',
    },
  },
  prototype: {
    /**
     * @description Fire an event containing the name of the element.
     * @memberof Tab
     * @function
     * @instance
     * @fires Tab#announce-name
     * @return {Tab} The Tab element.
     * @example @js component.announce(); // Fires the announce-name event.
     */
    tabannounce() {
      /**
       * @event Tab#announce-name
       * @memberof Tab
       * @description Fired when the `announce` method is called.
       * @property {String} detail.name The name of the component.
       */
      emit(this, 'tab-announce-name', {
        detail: {
          tabname: this.tabname,
        },
      });
      return this;
    },
  },
};

export default define('ak-tab', definition);
