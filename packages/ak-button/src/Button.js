import { vdom } from 'skatejs';
import classNames from 'classnames';

import getClasses from './internal/getButtonClasses';

/* eslint-disable react/prop-types */
const HtmlTag = (props, children) => {
  const commonProps = {
    className: classNames(getClasses(props.styles, props)),
    disabled: props.disabled,
    onmousedown: e => e.preventDefault(),
  };
  if (props.href) {
    if (props.disabled) {
      return (<span {...commonProps}>{children()}</span>);
    }
    return (<a href={props.href} target={props.target} {...commonProps}>{children()}</a>);
  }
  return (<button type={props.type} {...commonProps}>{children()}</button>);
};

export default (props, children) => (
  <span className={props.styles.root}>
    <HtmlTag {...props}>
      <span className={props.styles['button-content']}>
        {children()}
      </span>
    </HtmlTag>
  </span>
);
