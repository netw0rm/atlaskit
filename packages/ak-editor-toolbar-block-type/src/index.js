import { vdom, define, prop } from 'skatejs';
import cx from 'classnames';
import styles from './index.less';
import FontSelect from './font-select';
import Option from './option';
import Overlay from 'ak-editor-overlay';

const fonts = {
  paragraph: 'Paragraph',
  heading1: 'Heading 1',
  heading2: 'Heading 2',
  heading3: 'Heading 3',
  monospace: 'Monospace',
};

function toggle(elem) {
  elem.dropdownOpen = !elem.dropdownOpen;
}

function selectFont(elem) {
  return (event) => {
    elem.selectedFont = event.detail.font;
    toggle(elem);
  };
}

export default define('ak-editor-toolbar-block-type', {
  render(elem) {
    return (
      <div className={styles.locals.root}>
        <style>{styles.toString()}</style>
        <Overlay open={elem.dropdownOpen} ontoggleOverlay={() => toggle(elem)} />
        <FontSelect
          className={styles.locals.fontSelect}
          selectedReadableName={fonts[elem.selectedFont]}
          ontoggleDropdown={() => toggle(elem)}
          active={elem.dropdownOpen}
        >
          <ul
            className={cx(styles.locals.dropdownContent, {
              [styles.locals.dropdownOpen]: elem.dropdownOpen,
            })}
          >
            {Object.keys(fonts).map(font => (
              <li><Option
                font={font}
                onselectFont={selectFont(elem)}
                active={elem.selectedFont === font}
              >{fonts[font]}</Option></li>
            ))}
          </ul>
        </FontSelect>
      </div>
    );
  },
  props: {
    dropdownOpen: prop.boolean({ attribute: true }),
    selectedFont: prop.string({ attribute: true, default: Object.keys(fonts)[0] }),
  },
});
