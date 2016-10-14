import { vdom } from 'skatejs';
import classNames from 'classnames';

import { appearance } from './enumeratedProperties';


const { PRIMARY, SUBTLE, LINK } = appearance.values;

const getClasses = (styles, props) => ({
  [styles.button]: true,
  [styles.compact]: props.compact,
  [styles.disabled]: props.disabled,
  [styles.selected]: props.selected && !props.disabled,
  [styles.primary]: props.appearance === PRIMARY && !props.disabled && !props.selected,
  [styles.subtle]: props.appearance === SUBTLE && !props.disabled && !props.selected,
  [styles.link]: props.appearance === LINK && !props.selected,
});

/* eslint-disable react/prop-types */
export default (props, children) => (
  <span className={props.styles.root}>
    <button
      className={classNames(getClasses(props.styles, props))}
      type={props.type}
      disabled={props.disabled}
      onmousedown={e => e.preventDefault()}
    >
      <span className={props.styles['button-content']}>
        {children()}
      </span>
    </button>
  </span>
);
