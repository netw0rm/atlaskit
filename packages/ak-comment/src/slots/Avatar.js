import { vdom } from 'skatejs';

import shadowStyles from '../shadow.less';

/* eslint-disable react/prop-types */
export default () => (
  <div className={shadowStyles.locals.avatarSlotWrapper}>
    <slot name="avatar" className={shadowStyles.locals.avatarSlot}></slot>
  </div>
);
