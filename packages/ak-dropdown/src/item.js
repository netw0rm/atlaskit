import { emit, vdom, prop } from 'skatejs';
import shadowItemStyles from './shadow-item.less';
import classNames from 'classnames';
import keyCode from 'keycode';
import { selected as selectedEvent, item as itemEvents } from './internal/events';
import Checkbox from 'ak-icon/glyph/checkbox';
import Radio from 'ak-icon/glyph/radio';

function selectItem(item) {
  // disabled items should not allow any interactions
  // selected item doesn't need to be selected again
  // unless it's a checkbox item
  if (item.disabled || (item.selected && !item.checkbox)) {
    return;
  }

  emit(item, selectedEvent, {
    detail: {
      item,
    },
  });
}

function handleKeyDown(elem) {
  return (e) => {
    switch (e.keyCode) {
      case keyCode('up'):
        e.preventDefault();
        emit(elem, itemEvents.up);
        break;
      case keyCode('down'):
        e.preventDefault();
        emit(elem, itemEvents.down);
        break;
      case keyCode('tab'):
        e.preventDefault();
        emit(elem, itemEvents.tab);
        break;
      case keyCode('space'):
      case keyCode('enter'):
        selectItem(elem);
        break;
      default:
        break;
    }
  };
}

function childHasLeftSlot(list) {
  return [...list].some(el => (el.getAttribute && el.getAttribute('slot') === 'left'));
}

function renderLeftSlot(elem) {
  if (childHasLeftSlot(elem.childNodes)) {
    return (<div className={shadowItemStyles.locals.itemLeftPosition}>
      <slot name="left" />
    </div>);
  }
  return null;
}

function renderCheckboxIfNeeded(elem) {
  if (elem.checkbox) {
    return (<div className={shadowItemStyles.locals.itemLeftPosition}>
      <Checkbox />
    </div>);
  }
  return null;
}

function renderRadioIfNeeded(elem) {
  if (elem.radio) {
    return (<div className={shadowItemStyles.locals.itemLeftPosition}>
      <Radio />
    </div>);
  }
  return null;
}

export default {
  render(elem) {
    const classes = classNames(
      [shadowItemStyles.locals.item, {
        [shadowItemStyles.locals.disabled]: elem.disabled,
        [shadowItemStyles.locals.selected]: elem.selected && !elem.checkbox && !elem.radio,
        [shadowItemStyles.locals.selectedWithIcon]: elem.selected && (elem.checkbox || elem.radio),
        [shadowItemStyles.locals.first]: elem.first,
        [shadowItemStyles.locals.last]: elem.last,
      }]
    );
    const tabIndex = elem.selected ? '1' : '0';
    return (
      // void 0 is to remove href completely, null doesn't work
      <a
        tabindex={tabIndex}
        className={classes}
        onkeydown={handleKeyDown(elem)}
        onclick={() => selectItem(elem)}
        ref={el => (elem.item = el)}
        aria-disabled={elem.disabled}
        aria-selected={elem.selected}
        href={elem.href ? elem.href : void 0}
        target={elem.target ? elem.target : void 0}
      >
        <style>{shadowItemStyles.toString()}</style>
        {renderLeftSlot(elem)}
        {renderCheckboxIfNeeded(elem)}
        {renderRadioIfNeeded(elem)}
        <div className={shadowItemStyles.locals.itemDefaultPosition}><slot /></div>
      </a>
    );
  },
  props: {
    /**
     * @description disabled state of a dropdown's item
     * @memberof Dropdown
     * @default false
     * @type {Boolean}
     * @example @html <ak-dropdown>
     *   <ak-dropdown-item disabled>some content</ak-dropdown-item>
     * </ak-dropdown>
     * @example @js dropdown.childNodes[0].disabled = true;
     */
    disabled: prop.boolean({
      attribute: true,
    }),
    /**
     * @description selected state of a dropdown's item
     * @memberof Dropdown
     * @default false
     * @type {Boolean}
     * @example @html <ak-dropdown>
     *   <ak-dropdown-item selected>some content</ak-dropdown-item>
     * </ak-dropdown>
     * @example @js dropdown.childNodes[0].selected = true;
     */
    selected: prop.boolean({
      attribute: true,
    }),
    /**
     * @description whether an item is a checkbox item
     * @memberof Dropdown
     * @default false
     * @type {Boolean}
     * @example @html <ak-dropdown>
     *   <ak-dropdown-item checkbox>some content</ak-dropdown-item>
     * </ak-dropdown>
     * @example @js dropdown.childNodes[0].checkbox = true;
     */
    checkbox: prop.boolean({
      attribute: true,
    }),
    /**
     * @description whether an item is a radio item
     * @memberof Dropdown
     * @default false
     * @type {Boolean}
     * @example @html <ak-dropdown>
     *   <ak-dropdown-item radio>some content</ak-dropdown-item>
     * </ak-dropdown>
     * @example @js dropdown.childNodes[0].radio = true;
     */
    radio: prop.boolean({
      attribute: true,
    }),
    /**
     * @description is this item is first in the list of items
     * @memberof Dropdown
     * @default false
     * @type {Boolean}
     * @example @html <ak-dropdown>
     *   <ak-dropdown-item first>some content</ak-dropdown-item>
     * </ak-dropdown>
     * @example @js dropdown.childNodes[0].first = true;
     */
    first: prop.boolean({
      attribute: true,
    }),
    /**
     * @description is this item is last in the list of items
     * @memberof Dropdown
     * @default false
     * @type {Boolean}
     * @example @html <ak-dropdown>
     *   <ak-dropdown-item last>some content</ak-dropdown-item>
     * </ak-dropdown>
     * @example @js dropdown.childNodes[0].last = true;
     */
    last: prop.boolean({
      attribute: true,
    }),
    /**
     * @description focused state of a dropdown's item
     * @memberof Dropdown
     * @default false
     * @type {Boolean}
     * @example @html <ak-dropdown>
     *   <ak-dropdown-item focused>some content</ak-dropdown-item>
     * </ak-dropdown>
     * @example @js dropdown.childNodes[0].focused = true;
     */
    focused: prop.boolean({
      attribute: true,
      set(elem, data) {
        if (data.newValue) {
          setTimeout(() => elem.item.focus());
        }
      },
    }),
    /**
     * @description href for a dropdown item's link'
     * @memberof Dropdown
     * @default ''
     * @type {String}
     * @example @html <ak-dropdown>
     *   <ak-dropdown-item href="http://google.com">some content</ak-dropdown-item>
     * </ak-dropdown>
     * @example @js dropdownItem.href = 'http://google.com';
     */
    href: prop.string({
      attribute: true,
    }),
    /**
     * @description target for a dropdown item's link
     * @memberof Dropdown
     * @default ''
     * @type {String}
     * @example @html <ak-dropdown>
     *   <ak-dropdown-item href="http://google.com" target="_blank">some content</ak-dropdown-item>
     * </ak-dropdown>
     * @example @js dropdownItem._target = '_blank';
     */
    target: prop.string({
      attribute: true,
    }),
  },
};
