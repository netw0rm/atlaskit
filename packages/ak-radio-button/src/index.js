/** @jsx vdom */
import 'style!./host.less';

import { emit, vdom, define, prop } from 'skatejs';
import shadowStyles from './shadow.less';
import AkButton from 'ak-button';

/**
 * @description Create instances of the component programmatically, or using markup.
 * @class RadioButton
 * @example @js import RadioButton from 'ak-radio-button';
 * const component = new RadioButton();
 */
export default define('ak-radio-button', {
  render(elem) {
    return (
      <div>
        <style>{shadowStyles.toString()}</style>
        <AkButton appearance={elem.selected ? 'selected' : 'standard'}>
          <slot />
        </AkButton>
      </div>
    );
  },
  created(elem) {
    elem.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();

      elem.announce();
    });
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
    selected: prop.boolean({
      attribute: true,
      default: false,
    }),
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
      emit(this, 'x-radio-button-click', {
        detail: {
          name: this.name,
        },
      });
      return this;
    },
  },
});
