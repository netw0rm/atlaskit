/** @jsx vdom */

import { vdom, define, prop, emit } from 'skatejs';
import classnames from 'classnames';
import styles from './option.less';

export default define('ak-editor-toolbar-block-type-option', {
  render(elem) {
    return (
      <div>
        <style>{styles.toString()}</style>
        <a // eslint-disable-line jsx-a11y/no-static-element-interactions
          onClick={() => emit(elem, 'selectBlockType', { detail: { blockType: elem.blockType } })}
          onMousedown={/* don't blur the prose mirror editor */e => e.preventDefault()}
          className={classnames(
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
    blockType: { attribute: true },
  },
});
