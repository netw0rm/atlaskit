import { vdom, define, prop } from 'skatejs';
import cx from 'classnames';
import headStyles from 'style!./host.less'; // eslint-disable-line import/no-unresolved, no-unused-vars, max-len
import shadowStyles from './shadow.less';

export default define('editor-button', {
  render(elem) {
    return (
      <div className={cx(shadowStyles.locals.root, { [shadowStyles.locals.active]: elem.active })}>
        <style>{shadowStyles.toString()}</style>
        <button disabled={elem.disabled}><slot /></button>
      </div>
    );
  },
  events: {
    mousedown(elem, e) {
      e.preventDefault();
    },
  },
  props: {
    active: prop.boolean({ attribute: true, default: false }),
    disabled: prop.boolean({ attribute: true, default: false }),
  },
});
