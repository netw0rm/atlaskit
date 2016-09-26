import { vdom } from 'skatejs';

import 'style!./host.less';
import shadowStyles from './shadow.less';

/* eslint-disable react/prop-types */
export default (props) => (
  <div className={shadowStyles.locals.editModeSlotWrapper} onblur={() => props.onBlur()}>
    <slot
      className={shadowStyles.locals.editModeSlot}
      name={shadowStyles.locals.editModeSlot}
    />
  </div>
);
