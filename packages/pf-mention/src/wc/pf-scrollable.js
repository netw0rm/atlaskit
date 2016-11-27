/** @jsx vdom */

import { define, vdom } from 'skatejs';

import 'style!../host.less';

export default define('pf-scrollable', {
  prototype: {
    reveal(child) {
      if (child) {
        // Not using Element.scrollIntoView as it scrolls even to top/bottom of view even if
        // already visible
        const scrollableRect = this.getBoundingClientRect();
        const elementRect = child.getBoundingClientRect();
        if (elementRect.top < scrollableRect.top) {
          this.scrollTop += (elementRect.top - scrollableRect.top);
        } else if (elementRect.bottom > scrollableRect.bottom) {
          this.scrollTop += (elementRect.bottom - scrollableRect.bottom);
        }
      }
    },
  },

  render() {
    return (<slot />);
  },
});
