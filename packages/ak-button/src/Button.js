import { vdom } from 'skatejs';
import classNames from 'classnames';
import shadowStyles from './less/shadow.less';
import getClasses from './internal/get-button-classes';

/* eslint-disable react/prop-types */
const Element = (props, children) => {
  const commonProps = {
    className: classNames(getClasses(shadowStyles.locals, props)),
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
  <span className={shadowStyles.locals.root}>
    <style>{shadowStyles.toString()}</style>
    <Element {...props}>
      <span className={shadowStyles.locals.buttonContent}>
        {children()}
      </span>
    </Element>
  </span>
);
