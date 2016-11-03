import { vdom } from 'skatejs';

export default (props, children) => (
  <span
    {...props}
  >
    {children()}
  </span>
);
