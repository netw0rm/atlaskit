import { vdom } from 'skatejs';

/* eslint-disable react/prop-types */
export default (props, children) => (
  <a
    {...props}
    href={props.href}
    target={props.target}
  >
      {children()}
  </a>
);
