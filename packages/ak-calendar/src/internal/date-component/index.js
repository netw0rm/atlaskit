/** @jsx h */

import { style } from 'akutil-common';
import { define, vdom, h, prop } from 'skatejs';
import styles from './styles';


export default define('ak-calendar-date', {
  render(elem) {
    const css = style(vdom, styles);
    return (
      <span className={css.day}>{elem.day}</span>
    );
  },
  props: {
    day: prop.number({ attribute: true }),
    month: prop.number({ attribute: true }),
    year: prop.number({ attribute: true }),
  },
});
