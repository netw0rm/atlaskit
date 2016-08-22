import 'style!./host.less';
import { emit, vdom, define } from 'skatejs';
import shadowStyles from './shadow.less';

const Paragraph = (props, chren) => <p {...props}>{chren()}</p>;

/**
 * @description Create instances of the component programmatically, or using markup.
 * @class TagGroup
 * @example @js import TagGroup from 'ak-tag-group';
 * const component = new TagGroup();
 */
export default define('ak-tag-group', {
  render(elem) {
    return (
      <div>
        <style>{shadowStyles.toString()}</style>
        <div className={shadowStyles.locals.group}>

        </div>
      </div>
    );
  },
  props: {
    /**
     * @description The name of the TagGroup element.
     * @memberof TagGroup
     * @instance
     * @type {string}
     * @default TagGroup
     */
    name: {
      default: 'TagGroup',
    },
  },
  prototype: {
    /**
     * @description Fire an event containing the name of the element.
     * @memberof TagGroup
     * @function
     * @instance
     * @fires TagGroup#announce-name
     * @return {TagGroup} The TagGroup element.
     * @example @js component.announce(); // Fires the announce-name event.
     */
    announce() {
      /**
       * @event TagGroup#announce-name
       * @memberof TagGroup
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
