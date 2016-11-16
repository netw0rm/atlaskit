import { vdom } from 'skatejs';
import shadowStyles from './less/shadow.less';

/* eslint-disable react/prop-types */
const getSlotName = side => side || 'default';

export default props => (
  <span className={shadowStyles.locals[`${getSlotName(props.name)}SlotWrapper`]}>
    <slot
      name={props.name}
      className={shadowStyles.locals[`${getSlotName(props.name)}Slot`]}
    />
  </span>
);
