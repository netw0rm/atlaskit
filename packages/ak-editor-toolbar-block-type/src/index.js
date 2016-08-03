import { vdom, define, prop, emit } from 'skatejs';
import cx from 'classnames';
import styles from './index.less';
import FontSelect from './font-select';
import Option from './option';

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
    elem.dropdownOpen = false;

    // remove this when reactify v0.0.7 is released (https://github.com/webcomponents/react-integration/commit/53f8bf59a76b0ea0929bf2e95866ce949456eef5)
    emit(elem, 'selectfont', { detail: { font: elem.selectedFont } });
  };
}

export default define('ak-editor-toolbar-block-type', {
  created(elem) {
    elem.closeBlockTypeDropdown = () => {
      elem.dropdownOpen = false;
    };
  },
  attached(elem) {
    elem.context.addEventListener('click', elem.closeBlockTypeDropdown, true);
  },
  detached(elem) {
    elem.context.removeEventListener('click', elem.closeBlockTypeDropdown, true);
  },
  render(elem) {
    return (
      <div
        className={styles.locals.root}
        onselectFont={selectFont(elem)}
      >
        <style>{styles.toString()}</style>
        <FontSelect
          disabled={elem.disabled}
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
    disabled: prop.boolean({ attribute: true }),
    context: { attribute: true, default: document },
  },
});
