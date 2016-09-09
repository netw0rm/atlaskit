/* eslint no-underscore-dangle: 0 */
import 'style!./host.less';
import arrayEqual from 'array-equal';
import classNames from 'classnames';
import debounce from 'debounce';
import { vdom, define, prop } from 'skatejs';
import shadowStyles from './shadow.less';
import ResizeSensor from 'css-element-queries/src/ResizeSensor';

import * as helpers from './internal/tabs-helpers';
import * as handlers from './internal/tabs-handlers';
import * as events from './internal/events';
import * as i18n from './internal/i18n';
import Tab from './index-tab';
import Icon from 'ak-icon';
import Dropdown, { Item, Trigger } from 'ak-dropdown';

import { buttonContainer, labelsContainer, tabLabel } from './internal/symbols';
const resizeListener = Symbol();

const definition = {
  created(elem) {
    elem.addEventListener(events.TAB_SELECT, (e) => {
      helpers.getAllTabs(elem).filter(el => el !== e.target).forEach(el => (el.selected = false));
      helpers.updateProps(elem);
    });
    elem.addEventListener(events.TAB_DESELECT, () => {
      helpers.updateProps(elem);
    });
    elem.addEventListener(events.TAB_LABEL_CHANGE, () => {
      helpers.updateProps(elem);
    });
  },
  attached(elem) {
    // Re-render if necessary when the window is resized.
    elem[resizeListener] = new ResizeSensor(elem,
      debounce(() => (elem._visibleTabs = helpers.calculateVisibleTabs(elem)), 200)
    );
  },
  detached(elem) {
    elem[resizeListener].detach();
  },
  updated(elem, prev) {
    if (!prev) {
      return true;
    }
    // eslint-disable-next-line no-restricted-syntax
    for (const name in prev) {
      if (!arrayEqual(prev[name], elem[name])) {
        return true;
      }
    }
    return false;
  },
  render(elem) {
    const allTabs = helpers.getAllTabs(elem);
    const numTabs = allTabs.length;
    const hasOverflowingTabs = elem._visibleTabs.length < allTabs.filter(el => el[tabLabel]).length;
    const hasSingleTab = elem._visibleTabs.length === 1;
    const buttonClasses = classNames({
      [shadowStyles.locals.akTabLabel]: true,
      [shadowStyles.locals.akTabLabelHidden]: !hasOverflowingTabs,
    });
    const tabsVisible = helpers.getTabsVisibility(elem);
    let pos = 1;
    return (
      <div>
        <style>{shadowStyles.toString()}</style>
        <ul
          className={shadowStyles.locals.akTabLabels}
          role="tablist"
          ref={el => (elem[labelsContainer] = el)}
        >
          {allTabs && allTabs.map(
            tab => {
              const ariaSelected = `${!!tab.selected}`;
              const tabIndex = tab.selected ? '0' : '-1';
              const isVisible = tabsVisible.get(tab);
              const isSingleTab = hasSingleTab && isVisible;
              const classes = classNames({
                [shadowStyles.locals.akTabLabel]: true,
                [shadowStyles.locals.akTabLabelSelected]: tab.selected,
                [shadowStyles.locals.akTabLabelHidden]: !isVisible,
                [shadowStyles.locals.akTabLabelSingle]: isSingleTab,
              });
              return (
                <li
                  className={classes}
                  tabIndex={tabIndex}
                  onkeydown={handlers.labelKeydownHandler(elem, tab)}
                  onmousedown={handlers.labelMouseDownHandler}
                  onclick={handlers.labelSelectedHandler(tab)}
                  aria-selected={ariaSelected}
                  aria-setsize={numTabs}
                  aria-posinset={pos++}
                  role="tab"
                  ref={handlers.labelRef(elem, tab)}
                >
                  <span>{tab.label}</span>
                </li>
              );
            }
          ).concat(
            <li
              className={buttonClasses}
              aria-hidden="true"
              ref={el => (elem[buttonContainer] = el)}
            >
              <Dropdown>
                <Trigger slot="trigger" tabIndex="-1">
                  <a className={shadowStyles.locals.akTabsButton}>
                    <span>{i18n.more}</span>
                    <Icon glyph="expand" />
                  </a>
                </Trigger>
                {
                  allTabs && allTabs.filter(tab => !tabsVisible.get(tab)).map(tab => (
                    <Item onSelected={handlers.labelSelectedHandler(tab)}>{tab.label}</Item>
                  ))
                }
              </Dropdown>
            </li>
          )
        }
        </ul>
        <slot />
      </div>
    );
  },
  props: {
    /** TODO: Use Symbol once supported in skate */
    _labels: prop.array({}),
    _selected: prop.array({}),
    _visibleTabs: prop.array({}),
  },
};

export default define('ak-tabs', definition);
export { Tab };
