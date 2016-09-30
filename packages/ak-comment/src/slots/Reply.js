import { vdom } from 'skatejs';

import shadowStyles from '../shadow.less';

/* eslint-disable react/prop-types */
export default () => (
  <div className={shadowStyles.locals.replySlotWrapper}>
    <slot name="reply" className={shadowStyles.locals.replySlot}></slot>
  </div>
);
