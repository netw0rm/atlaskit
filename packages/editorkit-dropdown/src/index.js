import { vdom, prop } from 'skatejs';
import styles from './index.less';
import './font-select';
import './options';
import './overlay';

function toggle(elem) {
  const overlay = elem.querySelector('editorkit-overlay');
  overlay.open = !overlay.open;

  const fontSelect = elem.querySelector('editorkit-font-select');
  fontSelect.open = !fontSelect.open;
}

export default {
  render(elem) {
    return (
      <div className={styles.locals.root}>
        <style>{styles.toString()}</style>
        <editorkit-overlay />
        <editorkit-font-select className={styles.locals.dropdown} selectedReadableName={elem.selectedReadableName}>
          <editorkit-option-paragraph />
          <editorkit-option-heading1 />
          <editorkit-option-heading2 />
          <editorkit-option-heading3 />
          <editorkit-option-monospace />
        </editorkit-font-select>
      </div>
    );
  },
  ready(elem) {
    elem.selectedFont = 'editorkit-option-paragraph';
    elem.selectedReadableName = 'Paragraph';
  },
  events: {
    selectFont(elem, { target }) {
      elem.selectedReadableName = target.readableName;

      const selectedFont = elem.querySelector(elem.selectedFont);
      selectedFont.active = false
      elem.selectedFont = target.tagName.toLowerCase();

      target.active = true;

      toggle(elem);
    },
    toggleDropdown(elem) {
      toggle(elem);
    }
  },
  props: {
    selectedReadableName: prop.string()
  }
}
