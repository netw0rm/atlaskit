import { vdom, define, prop, symbols } from 'skatejs';
import styles from './index.less';
import './font-select';
import './option';
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
            <li><editorkit-option font="paragraph" active={true}>Paragraph</editorkit-option></li>
            <li><editorkit-option font="heading1">Heading 1</editorkit-option></li>
            <li><editorkit-option font="heading2">Heading 2</editorkit-option></li>
            <li><editorkit-option font="heading3">Heading 3</editorkit-option></li>
          </ul>
        </editorkit-font-select>
      </div>
    );
  },
  ready(elem) {
    elem.selectedFont = 'paragraph';
    elem.selectedReadableName = 'Paragraph';
  },
  events: {
    selectFont(elem, { target }) {
      elem.selectedReadableName = target.innerHTML;

      const selectedFont = elem.querySelector(`[font="${elem.selectedFont}"]`);
      selectedFont.active = false;

      elem.selectedFont = target.getAttribute('font');

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
