/** @jsx h */

import { style } from 'akutil-common';
import classnames from 'classnames';
import { define, vdom, h, prop } from 'skatejs';
import styles from './styles';

export default define('ak-calendar-date', {
  props: {
    day: prop.number({ attribute: true }),
    month: prop.number({ attribute: true }),
    year: prop.number({ attribute: true }),
    disabled: prop.boolean({ attribute: true }),
    focused: prop.boolean({ attribute: true }),
    selected: prop.boolean({ attribute: true }),
    selecting: prop.boolean({ attribute: true }),
    sibling: prop.boolean({ attribute: true }),
    today: prop.boolean({ attribute: true }),
  },
  render(elem) {
    const css = style(vdom, styles);
    return (
      <div
        className={classnames(css.day, {
          [css.disabled]: elem.disabled,
          [css.focused]: elem.focused,
          [css.selected]: elem.selected,
          [css.selecting]: elem.selecting,
          [css.sibling]: elem.sibling,
          [css.today]: elem.today,
        })}
      >{elem.day}</div>
    );
  },
});
