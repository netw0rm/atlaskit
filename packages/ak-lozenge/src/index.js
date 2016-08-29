import 'style!./host.less';
import { emit, vdom, define } from 'skatejs';
import shadowStyles from './shadow.less';

const Paragraph = (props, chren) => <p {...props}>{chren()}</p>;

/**
 * @description Create instances of the component programmatically, or using markup.
 * @class Lozenge
 * @example @js import Lozenge from 'ak-lozenge';
 * const component = new Lozenge();
 */
export default define('ak-lozenge', {
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
     * @description The name of the Lozenge element.
     * @memberof Lozenge
     * @instance
     * @type {string}
     * @default Lozenge
     */
    name: {
      default: 'Lozenge',
    },
  },
  prototype: {
    /**
     * @description Fire an event containing the name of the element.
     * @memberof Lozenge
     * @function
     * @instance
     * @fires Lozenge#announce-name
     * @return {Lozenge} The Lozenge element.
     * @example @js component.announce(); // Fires the announce-name event.
     */
    announce() {
      /**
       * @event Lozenge#announce-name
       * @memberof Lozenge
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
