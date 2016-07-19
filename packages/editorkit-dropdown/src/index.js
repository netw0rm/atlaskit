import { vdom, define, prop, symbols } from 'skatejs';
import styles from './index.less';
import './font-select';
import './options';
import './overlay';

function toggle(elem) {
  const overlay = elem[symbols.shadowRoot].querySelector('editorkit-overlay');
  overlay.open = !overlay.open;

  const fontSelect = elem[symbols.shadowRoot].querySelector('editorkit-font-select');
  fontSelect.open = !fontSelect.open;

  if (!fontSelect.open) {
    const editorButton = elem.querySelector('editor-button');
    editorButton.active = false
  }
}

export default define('editorkit-dropdown', {
  render(elem) {
    return (
      <div className={styles.locals.root}>
        <style>{styles.toString()}</style>
        <editorkit-overlay />
        <editorkit-font-select className={styles.locals.dropdown} selectedReadableName={elem.selectedReadableName}>
          <ul className={styles.locals.dropdownContent}>
            <li><editorkit-option-paragraph /></li>
            <li><editorkit-option-heading1 /></li>
            <li><editorkit-option-heading2 /></li>
            <li><editorkit-option-heading3 /></li>
            <li><editorkit-option-monospace /></li>
          </ul>
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
});
