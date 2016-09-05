import { define, prop } from 'skatejs';

export default define('ak-theme-var', {
  props: {
    name: prop.string({ attribute: true }),
    value: prop.string({ attribute: true }),
  },
});
