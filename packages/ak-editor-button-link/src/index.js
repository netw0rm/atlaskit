/** @jsx vdom */

import { vdom, define, prop } from 'skatejs';
import 'style!./host.less';
import shadowStyles from './shadow.less';

export default define('ak-editor-button-link', {
  render(elem) {
    return (
      <a className={shadowStyles.locals.root} href={elem.href} target={elem.target}>
        <style>{shadowStyles.toString()}</style>
        <slot />
      </a>
    );
  },
  props: {
    href: prop.string({ attribute: true }),
    target: prop.string({ attribute: true }),
  },
});
