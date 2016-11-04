/** @jsx h */
/* eslint-disable react/prop-types */

import { style } from 'akutil-common';
import { h, vdom } from 'skatejs';
import classnames from 'classnames';
import styles from './styles';

export default function (props) {
  const css = style(vdom, styles);
  return (
    <div
      {...props}
      className={classnames(css.day, {
        [css.disabled]: props.disabled,
        [css.focused]: props.focused,
        [css.previouslySelected]: props.previouslySelected,
        [css.selected]: props.selected,
        [css.selecting]: props.selecting,
        [css.sibling]: props.sibling,
        [css.today]: props.today,
      })}
    >{props.day}</div>
  );
}
