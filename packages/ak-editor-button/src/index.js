import { vdom, define, prop } from 'skatejs';
import cx from 'classnames';
import 'style!./host.less';
import shadowStyles from './shadow.less';

function preventDefault(e) {
  e.preventDefault();
}

export default define('ak-editor-button', {
  render(elem) {
    return (
      <div className={cx(shadowStyles.locals.root, { [shadowStyles.locals.active]: elem.active })}>
        <style>{shadowStyles.toString()}</style>
        <button disabled={elem.disabled} onMousedown={preventDefault}><slot /></button>
      </div>
    );
  },
  props: {
    active: prop.boolean({ attribute: true }),
    disabled: prop.boolean({ attribute: true }),
  },
});
