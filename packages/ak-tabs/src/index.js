/** @jsx vdom */
/* eslint no-underscore-dangle: 0 */
import 'style!./host.less';
import { debounce } from 'akutil-common';
import { vdom, define, prop, emit } from 'skatejs';
import classNames from 'classnames';
import shadowStyles from './shadow.less';

import 'ak-editor-icon';
import Tab, { events } from './index-tab'; // eslint-disable-line no-unused-vars

import {
  labelsContainer,
  buttonContainer,
  tabLabel,
} from './internal/symbols';

const resizeListener = Symbol();
const focusSelectedOnRender = Symbol();

/* Helpers */

function getAllTabs(tabsEl) {
  return [...tabsEl.children].filter(el => el.label);
}

function getNextOrPrevTab(tabsEl, tab, isNext) {
  const all = getAllTabs(tabsEl);
  let index = all.indexOf(tab);

  if (isNext) {
    index = index >= all.length - 1 ? index : index + 1;
  } else {
    index = index <= 0 ? index : index - 1;
  }

  return all[index];
}

function getNextTab(tabsEl, tab) {
  return getNextOrPrevTab(tabsEl, tab, true);
}

function getPrevTab(tabsEl, tab) {
  return getNextOrPrevTab(tabsEl, tab, false);
}

function getSelectedTab(tabsEl) {
  const all = getAllTabs(tabsEl);
  return all.length ? all.find(el => el.selected) || all[0] : null;
}

function getLabelForTab(tab) {
  return tab[tabLabel];
}

/* Handlers */

function labelMouseDownHandler(e) {
  e.preventDefault(); // Prevent focus on the tab label.
}

function labelClickHandler(tab) {
  return () => (tab.selected = true);
}

function labelKeydownHandler(tabsEl, tab) {
  return e => {
    let tabToSelect;
    if (e.keyCode === 37 /* LEFT */) {
      tabToSelect = getPrevTab(tabsEl, tab);
    } else if (e.keyCode === 39 /* RIGHT */) {
      tabToSelect = getNextTab(tabsEl, tab);
    }
    if (tabToSelect) {
      tabsEl[focusSelectedOnRender] = true;
      tabToSelect.selected = true;
    }
  };
}

function calculateVisibleTabs(tabsEl) {
  const tabLabelsContainer = tabsEl[labelsContainer];
  const tabsButtonContainer = tabsEl[buttonContainer];
  if (!tabLabelsContainer || !tabsButtonContainer) {
    return [];
  }

  // Get the width of the <li> item containing each tab label element.
  const allTabs = getAllTabs(tabsEl).filter(tab => tab[tabLabel]);

  let widthRemaining = tabLabelsContainer.getBoundingClientRect().width;
  const tabWidths = new Map(allTabs.map(
    tab => [tab, getLabelForTab(tab).getBoundingClientRect().width])
  );

  // If all the tabs fit, then just display them all.
  const hasOverflowingTabs = [...tabWidths.values()].reduce((a, b) => a + b, 0) > widthRemaining;
  if (!hasOverflowingTabs) {
    return allTabs;
  }

  // Otherwise, we need to fit the tabs into the available space, and pull some into a dropdown
  const visibleTabs = new Map();

  // The dropdown trigger item needs to be displayed
  widthRemaining -= tabsButtonContainer.getBoundingClientRect().width;

  // The currently selected tab is always displayed
  const selectedTab = getSelectedTab(tabsEl);
  visibleTabs.set(selectedTab, true);
  widthRemaining -= tabWidths.get(selectedTab);

  // Then try to fit each tab in the remaining space, until one doesn't fit
  let hasWidthRemaining = widthRemaining > 0;
  for (let i = 0; i < allTabs.length && hasWidthRemaining; i++) {
    const tab = allTabs[i];

    if (!visibleTabs.has(tab)) {
      const width = tabWidths.get(tab);

      if (widthRemaining >= width) {
        visibleTabs.set(tab, true);
        widthRemaining -= width;
        hasWidthRemaining = widthRemaining > 0;
      } else {
        hasWidthRemaining = false;
      }
    }
  }

  return [...visibleTabs.keys()];
}

const definition = {
  created(elem) {
    // Listen for tab change events
    elem.addEventListener(events.EVENT_TAB_CHANGE, e => {
      const allTabs = getAllTabs(elem);
      // If the tab has been selected, we need to deselect all other tabs.
      if (e.detail.hasOwnProperty('selected')) {
        const tab = e.detail.tab;
        if (tab.selected) {
          allTabs
            .filter(el => el.selected && el !== tab)
            .forEach(el => (el.selected = false));
        }

        // Emit event for tab selection or deselection
        const eventName = tab.selected ? events.EVENT_TAB_SELECT : events.EVENT_TAB_DESELECT;
        emit(tab, eventName, { detail: { tab } });
      }

      // Re-render if necessary.
      elem._selected = allTabs.map(el => el.selected);
      elem._labels = allTabs.map(el => el.label);
      elem._visibleTabs = calculateVisibleTabs(elem);
    });
  },
  attached(elem) {
    // If there is a selected tab, emit the event for the tab.
    const allTabs = getAllTabs(elem);
    if (allTabs.length) {
      const selectedTab = allTabs.find(el => el.selected);
      if (selectedTab) {
        emit(selectedTab, events.EVENT_TAB_SELECT, { detail: { tab: selectedTab } });
      }
    }

    // Re-render if necessary when the window is resized.
    elem[resizeListener] = debounce(() => {
      elem._visibleTabs = calculateVisibleTabs(elem);
    }, 500);
    window.addEventListener('resize', elem[resizeListener]);
  },
  detached(elem) {
    window.removeEventListener('resize', elem[resizeListener]);
  },
  render(elem) {
    const allTabs = getAllTabs(elem);
    const hasOverflowingTabs = elem._visibleTabs.length < allTabs.length;
    const hasSingleTab = elem._visibleTabs.length === 1;
    const buttonClasses = classNames({
      [shadowStyles.locals.akTabLabel]: true,
      [shadowStyles.locals.akTabLabelHidden]: !hasOverflowingTabs,
    });
    return (
      <div>
        <style>{shadowStyles.toString()}</style>
        <ul
          className={shadowStyles.locals.akTabLabels}
          ref={el => (elem[labelsContainer] = el)}
          role="tablist"
        >
          {allTabs && allTabs.map(
            tab => {
              const ariaSelected = tab.selected ? 'true' : 'false';
              const tabIndex = tab.selected ? '0' : '-1';
              const isVisible = elem._visibleTabs.indexOf(tab) > -1;
              const isSingleTab = hasSingleTab && isVisible;
              const classes = classNames({
                [shadowStyles.locals.akTabLabel]: true,
                [shadowStyles.locals.akTabLabelSelected]: tab.selected,
                [shadowStyles.locals.akTabLabelHidden]: !isVisible,
                [shadowStyles.locals.akTabLabelSingle]: isSingleTab,
              });
              const ref = el => {
                tab[tabLabel] = el;
                if (tab.selected) {
                  if (elem[focusSelectedOnRender]) {
                    el.focus();
                    elem[focusSelectedOnRender] = false;
                  }
                } else {
                  el.blur(); // Remove focus on a label that is no longer selected.
                }
              };
              return (
                <li
                  className={classes}
                  tabIndex={tabIndex}
                  onkeydown={labelKeydownHandler(elem, tab)}
                  onmousedown={labelMouseDownHandler}
                  onclick={labelClickHandler(tab)}
                  aria-selected={ariaSelected}
                  role="tab"
                  ref={ref}
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
                <span>More</span>
                <ak-editor-icon glyph="expand" />
              </a>
            </li>
          )
        }
        </ul>
        <slot />
        <ul
          className={classNames({
            [shadowStyles.locals.ddContainer]: true,
            [shadowStyles.locals.ddHidden]: !elem._dropdownOpen,
          })}
        >
          {allTabs && allTabs.map(
            tab => {
              const isVisible = elem._visibleTabs.indexOf(tab) > -1;
              const classes = classNames({
                [shadowStyles.locals.ddItem]: true,
                [shadowStyles.locals.ddHidden]: isVisible,
              });
              return (
                <li className={classes}>
                  <a
                    href="#"
                    onclick={labelClickHandler(tab)}
                    tabIndex="-1"
                  >{tab.label}</a>
                </li>
              );
            }
          )}
        </ul>
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
