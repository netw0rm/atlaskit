/** @jsx vdom */

import { vdom } from 'skatejs';

import shadowStyles from '../shadow.less';

/* eslint-disable react/prop-types */
export default () => (
  <div className={shadowStyles.locals.contentSlotWrapper}>
    <slot className={shadowStyles.locals.contentSlot} />
  </div>
);
