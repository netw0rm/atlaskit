import 'style!./host.less';
import { emit, vdom, define } from 'skatejs';
import shadowStyles from './shadow.less';

/**
 * @description Create instances of the component programmatically, or using markup.
 * @class Comment
 * @example @js import Comment from 'ak-comment';
 * const component = new Comment();
 */
export default define('ak-comment', {
  render() {
    return (
      <div>
        <style>{shadowStyles.toString()}</style>
        <div className={shadowStyles.locals.wrapper}>
          <div className={shadowStyles.locals.avatarSlotWrapper}>
            <slot name="avatar" className={shadowStyles.locals.avatarSlot}></slot>
          </div>
          <div className={shadowStyles.locals.content}>
            <div className={shadowStyles.locals.metadata}>
              <div className={shadowStyles.locals.authorSlotWrapper}>
                <slot name="author" className={shadowStyles.locals.authorSlot}></slot>
              </div>
              <div className={shadowStyles.locals.timeSlotWrapper}>
                <slot name="time" className={shadowStyles.locals.timeSlotWrapper}></slot>
              </div>
            </div>
            <div className={shadowStyles.locals.contentSlotWrapper}>
              <slot className={shadowStyles.locals.contentSlot}></slot>
            </div>
            <div className={shadowStyles.locals.actionSlotWrapper}>
              <slot name="actions" className={shadowStyles.locals.actionSlot}></slot>
            </div>
            <div className={shadowStyles.locals.replySlotWrapper}>
              <slot name="reply" className={shadowStyles.locals.replySlot}></slot>
            </div>
          </div>
        </div>
      </div>
    );
  },
  props: {
  },
  prototype: {
    /**
     * @description Fire an event containing the name of the element.
     * @memberof Comment
     * @function
     * @instance
     * @fires Comment#announce-name
     * @return {Comment} The Comment element.
     * @example @js component.announce(); // Fires the announce-name event.
     */
    announce() {
      /**
       * @event Comment#announce-name
       * @memberof Comment
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
