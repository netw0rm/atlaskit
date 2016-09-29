import { vdom } from 'skatejs';

import shadowStyles from '../shadow.less';

/* eslint-disable react/prop-types */
export default () => (
  <div className={shadowStyles.locals.authorSlotWrapper}>
    <slot name="author" className={shadowStyles.locals.authorSlot}></slot>
  </div>
);
