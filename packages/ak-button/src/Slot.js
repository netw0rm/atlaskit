import { vdom } from 'skatejs';
import shadowStyles from './shadow.less';

/* eslint-disable react/prop-types */
const getSlotName = side => side || 'default';

export default props => {
  const name = props.name;
  return (
    <span className={shadowStyles.locals[`${getSlotName(name)}SlotWrapper`]}>
      <slot
        name={name}
        className={shadowStyles.locals[`${getSlotName(name)}Slot`]}
      />
    </span>
  );
};
