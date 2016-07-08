import { vdom, define, state, prop } from 'skatejs';
import styles from './font-select.less';
import 'ak-layer';

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

    let className = styles.locals['font-select'];

    return (
      <div>
        <style>{styles.toString()}</style>
        <a className={className}
          onclick={_ => {
            state(elem, {
              active: !elem.active
            });
          }}
          >{elem._selectedReadableName}</a>
        <ak-layer target={`.${className}`} style={slotStyle}>
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
    active: prop.boolean({ attribute: true, default: false })
  },
});
