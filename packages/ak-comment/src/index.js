import 'style!./host.less';
import { vdom, define } from 'skatejs';
import shadowStyles from './shadow.less';

/**
 * @description Create instances of the component programmatically, or using markup.
 * @class AkComment
 * @example @js import AkComment from 'ak-comment';
 * const component = new AkComment();
 */
export default define('ak-comment', {
  render() {
    return (
      <div>
        <style>{shadowStyles.toString()}</style>
        <div className={shadowStyles.locals.container}>
          <div className={shadowStyles.locals.avatarSlotWrapper}>
            <slot name="avatar" className={shadowStyles.locals.avatarSlot}></slot>
          </div>
          <div className={shadowStyles.locals.content}>
            <div className={shadowStyles.locals.contentSlotWrapper}>
              <slot className={shadowStyles.locals.contentSlot}></slot>
            </div>
            <div className={shadowStyles.locals.metadata}>
              <div className={shadowStyles.locals.authorSlotWrapper}>
                <slot name="author" className={shadowStyles.locals.authorSlot}></slot>
              </div>
              <div className={shadowStyles.locals.timeSlotWrapper}>
                <slot name="time" className={shadowStyles.locals.timeSlot}></slot>
              </div>
              <div className={shadowStyles.locals.actionSlotWrapper}>
                <slot name="actions" className={shadowStyles.locals.actionSlot}></slot>
              </div>
            </div>
            <div className={shadowStyles.locals.replySlotWrapper}>
              <slot name="reply" className={shadowStyles.locals.replySlot}></slot>
            </div>
          </div>
        </div>
      </div>
    );
  },
});
