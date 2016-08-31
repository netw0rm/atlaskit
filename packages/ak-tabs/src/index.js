/* eslint no-underscore-dangle: 0 */
import 'style!./host.less';
import classNames from 'classnames';
import debounce from 'debounce';
import { vdom, define, prop, emit } from 'skatejs';
import shadowStyles from './shadow.less';

import * as helpers from './internal/tabs-helpers';
import * as handlers from './internal/tabs-handlers';
import * as events from './internal/events';
import * as i18n from './internal/i18n';
import Tab from './index-tab';

import { buttonContainer, labelsContainer } from './internal/symbols';
const resizeListener = Symbol();

const definition = {
  created(elem) {
    // Listen for tab change events
    elem.addEventListener(events.TAB_CHANGE, e => {
      if (e.detail.change && e.detail.change.selected) {
        // Emit the selection or deselection event.
        const tab = e.detail.tab;
        const eventName = e.detail.change.selected.newValue ?
          events.TAB_SELECT : events.TAB_DESELECT;
        emit(tab, eventName, { detail: { tab } });

        // If the tab has been selected, we need to deselect all other tabs.
        if (e.detail.change.selected.newValue) {
          helpers.getAllTabs(elem).filter(el => el !== tab).forEach(el => (el.selected = false));
        }
      }

      // Re-render if necessary.
      const allTabs = helpers.getAllTabs(elem);
      elem._selected = allTabs.map(el => el.selected);
      elem._labels = allTabs.map(el => el.label);
      elem._visibleTabs = helpers.calculateVisibleTabs(elem);
    });
  },
  attached(elem) {
    // Re-render if necessary when the window is resized.
    elem[resizeListener] = debounce(
      () => (elem._visibleTabs = helpers.calculateVisibleTabs(elem)), 200
    );
    window.addEventListener('resize', elem[resizeListener]);
  },
  detached(elem) {
    window.removeEventListener('resize', elem[resizeListener]);
  },
  render(elem) {
    const allTabs = helpers.getAllTabs(elem);
    const hasOverflowingTabs = elem._visibleTabs.length < allTabs.length;
    const hasSingleTab = elem._visibleTabs.length === 1;
    const buttonClasses = classNames({
      [shadowStyles.locals.akTabLabel]: true,
      [shadowStyles.locals.akTabLabelHidden]: !hasOverflowingTabs,
    });
    // TODO: We need to handle i18n for the 'More' text.
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
              const isVisible = elem._visibleTabs.indexOf(tab) > -1;
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
                  onclick={handlers.labelClickHandler(tab)}
                  aria-selected={ariaSelected}
                  role="tab"
                  ref={handlers.labelRef(elem, tab)}
                >
                  <span>{tab.label}</span>
                </li>
              );
            }
          ).concat(
            <li className={buttonClasses} ref={el => (elem[buttonContainer] = el)}>
              <a
                className={shadowStyles.locals.akTabsButton}
                onclick={() => {
                  elem._dropdownOpen = !elem._dropdownOpen;
                }}
              >
                <span>{i18n.more}</span>
              </a>
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
    _dropdownOpen: prop.boolean({
      initial: false,
    }),
  },
};

export default define('ak-tabs', definition);
export { Tab };
