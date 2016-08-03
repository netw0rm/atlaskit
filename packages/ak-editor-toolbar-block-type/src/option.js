import { vdom, define, prop, emit } from 'skatejs';
import classnames from 'classnames';
import styles from './option.less';

export default define('ak-editor-toolbar-block-type-option', {
  render(elem) {
    return (
      <div>
        <style>{styles.toString()}</style>
        <a
          onclick={() => emit(elem, 'selectFont', { detail: { font: elem.font } })}
          onmousedown={e => e.preventDefault()}
          className={classnames(
          styles.locals[elem.font],
          styles.locals.selectOptions, {
            [styles.locals.active]: elem.active === true,
          }
        )}
        ><slot /></a>
      </div>
    );
  },
  props: {
    active: prop.boolean({ attribute: true }),
    font: prop.string({ attribute: true }),
  },
});
