/* eslint-disable react/prop-types */

import { vdom } from 'skatejs';
import classnames from 'classnames';
import css from './index.less';

const { locals } = css;

export default function (props) {
  return (
    <div
      {...props}
      className={classnames(locals.day, {
        [locals.disabled]: props.disabled,
        [locals.focused]: props.focused,
        [locals.previouslySelected]: props.previouslySelected,
        [locals.selected]: props.selected,
        [locals.selecting]: props.selecting,
        [locals.sibling]: props.sibling,
        [locals.today]: props.today,
      })}
    >
      {props.day}
      <div className={locals.underline} />
    </div>
  );
}
