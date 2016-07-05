import headStyles from 'style!./host.less'; // eslint-disable-line no-unused-vars, import/no-unresolved, max-len
import shadowStyles from './shadow.less';

import 'akutil-polyfills';
import { define, emit, vdom } from 'skatejs';

/**
 * @constructs PonyButton
 * @description This button think it is a pony, but its really just a button.
 * I can write some more information about my pony button here.
 *
 * This is a new paragraph. I'll write some more words here to pad it out.
 * There is a new line before this line but it should be in the same paragraph.
 * We can have some nicely formatted text here describing the component and giving some basic
 * information about its usage.
 *
 * Here's some closing words in a third paragraph. Thanks for reading.
 * @example <ak-pony-button>Button text.</ak-pony-button>
 */
const PonyButton = define('ak-pony-button', {
  render(elem) {
    vdom.style(shadowStyles.toString());
    vdom.button(() => {
      vdom.span(`I am a pony. My name is ${elem.name}. `);
      vdom.span(() => {
        vdom.slot();
      });
    });
  },
  events: {
    /**
     * @description Event handler. The pony button will fire the ak-neigh event when it is clicked.
     * @memberof PonyButton
     * @instance
     * @fires PonyButton#ak-neigh
     * @listens click
       */
    click(elem) {
      /**
       * @event PonyButton#ak-neigh
       * @memberof PonyButton
       * @description Fired when the pony neighs. This normally happens when it is hungry.
       * @property {String} detail.name The name of the pony button.
       * @example ponyButton.addEventListener('ak-neigh', function (event) {
       *   console.log(event.detail.name + ' neighed. Maybe your pony is hungry?');
       * });
       */
      emit(elem, 'ak-neigh', {
        detail: {
          name: elem.name,
        },
      });
    },
  },
  props: {
    /**
     * @description The name of the pony button. Defaults to "Bob" if not supplied.
     * @memberof PonyButton
     * @defaultvalue Bob
     * @instance
     * @type {string}
     * @example <ak-pony-button name="Randy">Button text</ak-pony-button>
     */
    name: {
      attribute: true,
      default: 'Bob',
    },
  },
  prototype: {
    /**
     * @description This method will fire the ak-neigh event.
     * @memberof PonyButton
     * @function
     * @instance
     * @fires PonyButton#ak-neigh
     * @return {PonyButton} The PonyButton element.
     * @example ponyButton.neigh(); // Fires the ak-neigh event.
     */
    neigh() {
      emit(this, 'ak-neigh');
      return this;
    },
  },
});

export default PonyButton;
