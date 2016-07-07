import { vdom, define, state, prop } from 'skatejs';
import styles from './font-select.less';

function handleSelected(elem, target) {
  const selectedFont = elem.querySelector(elem._selectedFont);
  state(selectedFont, {
    active: false
  });

  elem._selectedFont = target.tagName.toLowerCase();
  elem._selectedReadableName = target.readableName;
  state(target, {
    active: true
  });

  state(elem, {
    active: false
  });
}

export default define('editorkit-font-select', {
  render(elem) {
    if (!elem._selectedFont) {
      elem._selectedFont = 'editorkit-option-paragraph';
      elem._selectedReadableName = 'Paragraph'
    }

    const { active } = state(elem);
    const slotStyle = {
      display: active ? 'block' : 'none'
    };

    return (
      <div style={{position: 'absolute'}}>
        <style>{styles.toString()}</style>
        <a className={styles.locals['font-select']}>{elem._selectedReadableName}</a>
        <slot style={slotStyle}></slot>
      </div>
    );
  },
  ready(elem) {
    const button = elem.querySelector('a');
    button.addEventListener('mouseup', _ => button.blur());
    button.addEventListener('click', _ => {
      state(elem, {
        active: !elem.active
      });
    });
  },
  events: {
    selected(elem, event) {
      handleSelected(elem, event.target);
    }
  },
  props: {
    active: prop.boolean({ attribute: true, default: false }),
  },
});
