/** @jsx vdom */

import { vdom, prop, define } from 'skatejs';

export default define('ak-layer-impl', {
  props: {
    position: prop.string({ attribute: true, default: 'right middle' }),
    attachment: prop.string({ attribute: true, default: 'window' }),
    target: prop.string({ attribute: true }),
    renderElementTo: prop.string({ attribute: true }),
  },
  render(elem) {
    return (
      <slot name="layer" />
    );
  },
});
