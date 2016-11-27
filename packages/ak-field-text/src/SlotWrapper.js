/** @jsx vdom */

import { vdom } from 'skatejs';

export default () => (
  <div slot="input-slot">
    <slot name="input-slot" />
  </div>
);
