import { vdom, define, prop, emit } from 'skatejs';
import cx from 'classnames';
import styles from './index.less';
import FontSelect from './font-select';
import Option from './option';

function toggle(elem) {
  if (!elem.disabled || elem.dropdownOpen) {
    elem.dropdownOpen = !elem.dropdownOpen;
  }
}

function selectFont(elem) {
  return (event) => {
    elem.selectedFont = event.detail.font;
    toggle(elem);

    // remove this when reactify v0.0.7 is released (https://github.com/webcomponents/react-integration/commit/53f8bf59a76b0ea0929bf2e95866ce949456eef5)
    emit(elem, 'selectfont', { detail: { font: elem.selectedFont } });
  };
}

export default define('ak-editor-toolbar-block-type', {
  render(elem) {
    const selectedFont = elem.selectedFont || elem.fonts[0];

    return (
      <div
        className={styles.locals.root}
        onSelectFont={selectFont(elem)}
      >
        <style>{styles.toString()}</style>
        <FontSelect
          disabled={elem.disabled}
          className={styles.locals.fontSelect}
          selectedReadableName={selectedFont.display}
          onToggleDropdown={() => toggle(elem)}
          active={elem.dropdownOpen}
        >
          <ul
            className={cx(styles.locals.dropdownContent, {
              [styles.locals.dropdownOpen]: elem.dropdownOpen,
            })}
          >
            {elem.fonts.map(font => (
              <li><Option
                font={font}
                font-name={font.name}
                active={selectedFont === font}
              >{font.display}</Option></li>
            ))}
          </ul>
        </FontSelect>
      </div>
    );
  },
  props: {
    dropdownOpen: prop.boolean({ attribute: true }),
    selectedFont: { attribute: true },
    fonts: prop.array({ attribute: true }),
    disabled: prop.boolean({ attribute: true }),
  },
});
