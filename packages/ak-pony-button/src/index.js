import headStyles from 'style!./host.less'; // eslint-disable-line no-unused-vars, import/no-unresolved, max-len
import shadowStyles from './shadow.less';

import 'akutil-polyfills';
import { define, emit, vdom } from 'skatejs';

/**
 * @constructs PonyButton
 * @description This button think it is a pony, but its really just a button.
 * @example <ak-pony-button></ak-pony-button>
 */
const PonyButton = define('ak-pony-button', {
  render(elem) {
    vdom.style(shadowStyles.toString());
    vdom.button(() => {
      vdom.span(`I am a pony. My name is ${elem.name}.`);
      vdom.span(()=> {
        vdom.slot();
      });
    });
  },
  events: {
    /**
     * @description <strong>Event handler.</strong> The pony button will log output to the console
     * and fire the {@link ak-neigh|ak-neigh} event when it is clicked.
     * @memberof PonyButton
     * @instance
     * @fires PonyButton#ak-neigh
     * @listens click
       */
    click(elem) {
      console.log('Neigh. I am a pony.'); // eslint-disable-line no-console
      /**
       * @event PonyButton#ak-neigh
       * @description Description of the ak-neigh event goes here.
       */
      emit(elem, 'ak-neigh');
    },
  },
  props: {
    /**
     * @description The name of the pony button.
     * @memberof PonyButton
     * @defaultvalue Bob
     * @instance
     * @type {string}
     * @example <ak-pony-button name="Randy"></ak-pony-button>
     */
    name: {
      attribute: true,
      default: 'Bob',
    },
  },
  prototype: {
    /**
     * @description This method will log output the the console and fire the ak-neigh event.
     * @memberof PonyButton
     * @function
     * @instance
     * @fires PonyButton#ak-neigh
     * @return {PonyButton} The PonyButton element.
     * @example ponyButton.canter(); // Clop clop clop.
     */
    canter() {
      console.log('Clop clop clop.'); // eslint-disable-line no-console
      emit(this, 'ak-neigh');
      return this;
    },
  },
});

export default PonyButton;
