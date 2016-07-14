import { vdom, define, prop, emit } from 'skatejs';
import styles from './font-select.less';
import 'ak-layer';

export default define('editorkit-font-select', {
  render(elem) {
    const style = {
      display: elem.open ? 'block' : 'none'
    };

    const className = styles.locals.fontSelect;

    return (
      <div>
        <style>{styles.toString()}</style>
        <a
          className={className}
          onclick={_ => {
            emit(elem, 'toggleDropdown');
          }}>{elem.selectedReadableName}</a>
        <ak-layer target={`.${className}`} position="bottom center" style={style} open={elem.open}>
          <slot></slot>
        </ak-layer>
      </div>
    );
  },
  props: {
    open: prop.boolean({ attribute: true }),
    selectedReadableName: prop.string({ attribute: true })
  }
});
