/** @jsx vdom */

import { vdom } from 'skatejs';

import shadowStyles from '../shadow.less';

/* eslint-disable react/prop-types */
export default () => (
  <div className={shadowStyles.locals.actionSlotWrapper}>
    <slot name="actions" className={shadowStyles.locals.actionSlot} />
  </div>
);
