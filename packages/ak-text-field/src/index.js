import 'style!./host.less';
// import classNames from 'classnames';
import { emit, vdom, define } from 'skatejs';
import shadowStyles from './shadow.less';

/**
 * @description Create instances of the component programmatically, or using markup.
 * @class TextField
 * @example @js import TextField from 'ak-text-field';
 * const component = new TextField();
 */
export default define('ak-text-field', {
  render(elem) {
    return (
      // JSX requires that there only be a single root element.
      // Incremental DOM doesn't require this.
      <div className={shadowStyles.locals.defaultSlotWrapper}>
        {/* This is required for elements in the shadow root to be styled.
           This is wrapped in the <div /> because you can't have more than one
           root element.
        */}
        <style>{shadowStyles.toString()}</style>
        <label className={shadowStyles.locals.label}>{elem.label}</label>
        <slot className={shadowStyles.locals.defaultSlotElement} />
      </div>
    );
  },
  props: {
    /**
     * @description The name of the TextField element.
     * @memberof TextField
     * @instance
     * @type {string}
     * @default TextField
     */
    name: {
      default: 'TextField',
    },
  },
  prototype: {
    /**
     * @description Fire an event containing the name of the element.
     * @memberof TextField
     * @function
     * @instance
     * @fires TextField#announce-name
     * @return {TextField} The TextField element.
     * @example @js component.announce(); // Fires the announce-name event.
     */
    announce() {
      /**
       * @event TextField#announce-name
       * @memberof TextField
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
