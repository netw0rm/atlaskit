import { vdom } from 'skatejs';

/* eslint-disable react/prop-types */
const getSlotName = side => side || 'default';

export default props => {
  const name = props.name;
  const styles = props.styles;
  return (
    <span className={styles[`${getSlotName(name)}-slot-wrapper`]}>
      <slot
        name={name}
        className={styles[`${getSlotName(name)}-slot`]}
      />
    </span>
  );
};
