import 'style!./host.less';
import classNames from 'classnames';
import { emit, vdom, define } from 'skatejs';
import shadowStyles from './shadow.less';
import * as events from './internal/events';
const { announceName: announceNameEvent } = events;

const Paragraph = (props, chren) => <p {...props}>{chren()}</p>;

/**
 * @description Create instances of the component programmatically, or using markup.
 * @class Calendar
 * @example @js import Calendar from 'ak-calendar';
 * const component = new Calendar();
 */
export default define('ak-calendar', {
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
        <Paragraph className={paragraphClasses}>My name is {elem.name}!</Paragraph>
      </div>
    );
  },
  props: {
    /**
     * @description The name of the Calendar element.
     * @memberof Calendar
     * @instance
     * @type {string}
     * @default Calendar
     */
    name: {
      default: 'Calendar',
    },
  },
  prototype: {
    /**
     * @description Fire an event containing the name of the element.
     * @memberof Calendar
     * @function
     * @instance
     * @fires Calendar#announce-name
     * @return {Calendar} The Calendar element.
     * @example @js component.announce(); // Fires the announce-name event.
     */
    announce() {
      /**
       * @event Calendar#announce-name
       * @memberof Calendar
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
