import { emit, vdom, define, prop, symbols } from 'skatejs';
import shadowItemStyles from './shadow-item.less';
import classNames from 'classnames';
// import { KeyPressHandler } from 'akutil-common';

function selectItem(item, list) {
  return () => {
    // disabled items should not allow any interactions
    // selected item doesn't need to be selected again
    if (item.disabled || item.selected) {
      return;
    }
    list.forEach((child) => {
      child.selected = false;
    });
    item.selected = true;
    emit(item, 'ak-dropdown-selected');
  };
}

export default define('ak-dropdown-item', {
  render(elem) {
    const list = elem.parentNode[symbols.shadowRoot].querySelectorAll('ak-dropdown-item');

    const classes = classNames(
      [shadowItemStyles.locals.item, {
        [`${shadowItemStyles.locals.disabled}`]: elem.disabled,
        [`${shadowItemStyles.locals.selected}`]: elem.selected,
        [`${shadowItemStyles.locals.first}`]: list[0] === elem,
        [`${shadowItemStyles.locals.last}`]: list[list.length - 1] === elem,
      }]
    );
    return (
      <div class={classes} on-click={selectItem(elem, list)}>
        <style>{shadowItemStyles.toString()}</style>
        <slot />
      </div>
    );
  },
  props: {
    disabled: prop.boolean({
      attribute: true,
    }),
    selected: prop.boolean({
      attribute: true,
    }),
  },
});
