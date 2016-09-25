import { vdom } from 'skatejs';

/* eslint-disable react/prop-types */
export default (props, children) => (
  <a
    {...props}
  >
      {children()}
  </a>
);
