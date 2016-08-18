import 'style!./host.less';
import { emit, vdom, define } from 'skatejs';
import shadowStyles from './shadow.less';

const Paragraph = (props, chren) => <p {...props}>{chren()}</p>;

/**
 * @description Create instances of the component programmatically, or using markup.
 * @class Tabs
 * @example @js import Tabs from 'ak-tabs';
 * const component = new Tabs();
 */
export default define('ak-tabs', {
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
        <Paragraph className={shadowStyles.locals.myClassName}>My name is {elem.name}!</Paragraph>
      </div>
    );
  },
  props: {
    /**
     * @description The name of the Tabs element.
     * @memberof Tabs
     * @instance
     * @type {string}
     * @default Tabs
     */
    name: {
      default: 'Tabs',
    },
  },
  prototype: {
    /**
     * @description Fire an event containing the name of the element.
     * @memberof Tabs
     * @function
     * @instance
     * @fires Tabs#announce-name
     * @return {Tabs} The Tabs element.
     * @example @js component.announce(); // Fires the announce-name event.
     */
    announce() {
      /**
       * @event Tabs#announce-name
       * @memberof Tabs
       * @description Fired when the `announce` method is called.
       * @property {String} detail.name The name of the component.
       */
      emit(this, 'announce-name', {
        detail: {
          name: this.name,
        },
      });
      return this;
    },
  },
});
