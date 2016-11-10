import { vdom, define, prop, emit, Component } from 'skatejs';
import classnames from 'classnames';
import styles from './Option.less';

function preventDefault(e) {
  e.preventDefault();
}

export default define('ak-editor-ui-toolbar-block-type-option', class extends Component {
  static get props() {
    return {
      active: prop.boolean({ attribute: true }),
      blockType: { attribute: true },
    };
  }

  static render(elem) {
    return (
      <div>
        <style>{styles.toString()}</style>
        <a // eslint-disable-line jsx-a11y/no-static-element-interactions
          onClick={() => emit(elem, 'selectBlockType', { detail: { blockType: elem.blockType } })}
          onMousedown={/* don't blur the prose mirror editor */preventDefault}
          className={classnames(
            styles.locals.selectOptions, {
              [styles.locals.active]: elem.active === true,
            }
          )}
        ><slot /></a>
      </div>
    );
  }
});
