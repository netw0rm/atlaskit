import { vdom, define, state, prop } from 'skatejs';
import styles from './font-select.less';
import 'ak-layer';

function handleSelected(elem, target) {
  const selectedFont = elem.querySelector(elem._selectedFont);
  state(selectedFont, {
    open: false
  });

  elem._selectedFont = target.tagName.toLowerCase();
  elem._selectedReadableName = target.readableName;
  state(target, {
    open: true
  });

  state(elem, {
    open: false
  });
}

export default define('editorkit-font-select', {
  render(elem) {
    if (!elem._selectedFont) {
      elem._selectedFont = 'editorkit-option-paragraph';
      elem._selectedReadableName = 'Paragraph'
    }

    const { open } = state(elem);
    const slotStyle = {
      display: open ? 'block' : 'none'
    };

    const className = styles.locals['font-select'];

    const anchor = <a className={className}
      onclick={_ => {
        state(elem, {
          open: !elem.open
        });
      }}
      >{elem._selectedReadableName}</a>()

    return (
      <div>
        <style>{styles.toString()}</style>
        <anchor />
        <ak-layer target={anchor} position="bottom center">
          <slot></slot>
        </ak-layer>
      </div>
    );
  },
  events: {
    selected(elem, event) {
      handleSelected(elem, event.target);
    }
  },
  props: {
    open: prop.boolean({ attribute: true })
  },
});
