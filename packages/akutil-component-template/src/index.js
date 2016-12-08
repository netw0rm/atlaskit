/** @jsx vdom */

import classNames from 'classnames';
import { emit, vdom, define } from 'skatejs';

import shadowStyles from './shadow.less';
import * as events from './internal/events';

const { announceName: announceNameEvent, announceClick } = events;

const Paragraph = (props, chren) => <p {...props}>{chren()}</p>;
const handleClick = Symbol('handleClick');

/**
 * @description Create instances of the component programmatically, or using markup.
 * @class AkUtilComponentTemplate
 * @example @js import AkUtilComponentTemplate from 'akutil-component-template';
 * const component = new AkUtilComponentTemplate();
 */
export default define('akutil-component-template', {
  create(elem) {
    elem[handleClick] = () => {
      // We want to emit the elem in the detail because of the shadow boundries and retargeting
      // https://www.w3.org/TR/shadow-dom/#event-retargeting
      emit(elem, announceClick, {
        detail: {
          item: elem,
        },
      });
    };
  },
  render(elem) {
    const paragraphClasses = classNames({
      [shadowStyles.locals.myClassName]: true,
      anotherClass: false,
    });
    return (
      // JSX requires that there only be a single root element.
      // Incremental DOM doesn't require this.
      <div>
        {/* This is required for elements in the shadow root to be styled.
           This is wrapped in the <div /> because you can't have more than one
           root element.
        */}
        <style>{shadowStyles.toString()}</style>
        <Paragraph
          className={paragraphClasses}
          onclick={elem[handleClick]}
        >My name is {elem.name}!</Paragraph>
      </div>
    );
  },
  props: {
    /**
     * @description The name of the AkUtilComponentTemplate element.
     * @memberof AkUtilComponentTemplate
     * @instance
     * @type {string}
     * @default AkUtilComponentTemplate
     */
    name: {
      default: 'AkUtilComponentTemplate',
    },
  },
  prototype: {
    /**
     * @description Fire an event containing the name of the element.
     * @memberof AkUtilComponentTemplate
     * @function
     * @instance
     * @fires AkUtilComponentTemplate#announce-name
     * @return {AkUtilComponentTemplate} The AkUtilComponentTemplate element.
     * @example @js component.announce(); // Fires the announce-name event.
     */
    announce() {
      /**
       * @event AkUtilComponentTemplate#announce-name
       * @memberof AkUtilComponentTemplate
       * @description Fired when the `announce` method is called.
       * @property {String} detail.name The name of the component.
       */
      emit(this, announceNameEvent, {
        detail: {
          name: this.name,
        },
      });
      return this;
    },
  },
});

export { events };
