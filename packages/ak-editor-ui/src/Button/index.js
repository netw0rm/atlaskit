/** @jsx vdom */

import { vdom, define, prop, Component } from 'skatejs';
import cx from 'classnames';
import 'style!./host.less';
import shadowStyles from './shadow.less';

/* don't blur the prose mirror editor */
function preventDefault(e) {
  e.preventDefault();
}

export default define('ak-editor-ui-button', class extends Component {
  static get props() {
    return {
      active: prop.boolean({ attribute: true }),
      disabled: prop.boolean({ attribute: true }),
    };
  }

  static render(elem) {
    return (
      <div className={cx(shadowStyles.locals.root, { [shadowStyles.locals.active]: elem.active })}>
        <style>{shadowStyles.toString()}</style>
        <button
          disabled={elem.disabled}
          onMousedown={preventDefault}
          style={{ color: 'inherit' }}
        >
          <slot />
        </button>
      </div>
    );
  }
});
