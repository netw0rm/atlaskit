import { vdom } from 'skatejs';

import shadowStyles from '../shadow.less';

/* eslint-disable react/prop-types */
export default () => (
  <div className={shadowStyles.locals.timeSlotWrapper}>
    <slot name="time" className={shadowStyles.locals.timeSlot} />
  </div>
);
