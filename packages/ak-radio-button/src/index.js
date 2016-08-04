/** @jsx vdom */
import 'style!./host.less';

import { emit, vdom, define } from 'skatejs';
import shadowStyles from './shadow.less';
import Button from 'ak-button';

const Paragraph = (props, chren) => <p {...props}>{chren()}</p>;

/**
 * @description Create instances of the component programmatically, or using markup.
 * @class RadioButton
 * @example @js import RadioButton from 'ak-radio-button';
 * const component = new RadioButton();
 */
export default define('ak-radio-button', {
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
        <Button>Ben</Button>
        <Paragraph className={shadowStyles.locals.myClassName}>My name is {elem.name}!</Paragraph>
      </div>
    );
  },
  props: {
    /**
     * @description The name of the RadioButton element.
     * @memberof RadioButton
     * @instance
     * @type {string}
     * @default RadioButton
     */
    name: {
      default: 'RadioButton',
    },
  },
  prototype: {
    /**
     * @description Fire an event containing the name of the element.
     * @memberof RadioButton
     * @function
     * @instance
     * @fires RadioButton#announce-name
     * @return {RadioButton} The RadioButton element.
     * @example @js component.announce(); // Fires the announce-name event.
     */
    announce() {
      /**
       * @event RadioButton#announce-name
       * @memberof RadioButton
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
