import { vdom } from 'skatejs';
import classNames from 'classnames';
import getClasses from './internal/getButtonClasses';

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
