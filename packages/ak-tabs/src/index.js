/** @jsx vdom */
/* eslint no-underscore-dangle: 0 */
import 'style!./host.less';

import { vdom, define, prop, emit } from 'skatejs';
import shadowStyles from './shadow.less';
import Tab, { // eslint-disable-line no-unused-vars
  events as tabEvents,
  symbols as tabSymbols,
} from './children/tab';


/* Symbols */
const labelsContainer = Symbol();
const resizeListener = Symbol();
const buttonContainer = Symbol();

/* Helpers */

function getAllTabs(tabsEl) {
  return tabsEl.children.filter(el => el.label);
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
  return tab[tabSymbols.tabLabel];
}

/* Handlers */

function labelClickHandler(tab) {
  return () => {
    if (!tab.selected) {
      emit(tab, tabEvents.EVENT_TAB_SELECT, { detail: { tab } });
    }
  };
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
      emit(
        tabToSelect,
        tabEvents.EVENT_TAB_SELECT,
        { detail: { tab: tabToSelect, keyboardNav: true } }
      );
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
  const MARGIN = 5; // Margin 5px
  const allTabs = getAllTabs(tabsEl).filter(tab => tab[tabSymbols.tabLabel]);

  let widthRemaining = tabLabelsContainer.getBoundingClientRect().width;
  const tabWidths = new Map(allTabs.map(
    tab => [tab, getLabelForTab(tab).parentNode.getBoundingClientRect().width + (2 * MARGIN)])
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

  // The currently selected tab has the highest priority
  const selectedTab = getSelectedTab(tabsEl);
  if (widthRemaining >= tabWidths.get(selectedTab)) {
    visibleTabs.set(selectedTab, true);
    widthRemaining -= tabWidths.get(selectedTab);
  } else {
    // If the selected tab does not fit in the remaining space, display only the dropdown trigger.
    return [];
  }

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
    /* Check for existing selected tab:
     * - If no tab is selected and a tab exists, select the first one
     * - If multiple tabs are selected, select only the first one
     */

    /* Listen for tab change events
     * - Select the tab
     * - Calculate positioning and setup _visibleTabs
     * - Re-render if necessary
     */
    elem.addEventListener(tabEvents.EVENT_TAB_CHANGE, e => {
      // If the tab has been selected, we need to deselect all other tabs.
      const targetLabel = e.target;
      if (targetLabel.selected) {
        elem.children
          .filter(el => el.selected && el !== targetLabel)
          .forEach(tabToDeselect => {
            emit(
              tabToDeselect,
              tabEvents.EVENT_TAB_DESELECT,
              { detail: { tab: tabToDeselect } }
            );
          });
      }

      elem._labels = elem.children.map(el => el.label);
      elem._selected = elem.children.map(el => el.selected);
      elem._visibleTabs = calculateVisibleTabs(elem);
    });

    // Listen for tab select and deselect events
    elem.addEventListener(tabEvents.EVENT_TAB_SELECT, e => { elem.onSelect(e); });
    elem.addEventListener(tabEvents.EVENT_TAB_DESELECT, e => { elem.onDeselect(e); });
  },
  attached(elem) {
    // If there is no selected tab, try to select the first tab.
    if (!elem.children.some(el => el.label && el.selected)) {
      const tab = elem.children.find(el => el.label);
      emit(tab, tabEvents.EVENT_TAB_SELECT, { detail: { tab } });
    }

    elem[resizeListener] = () => {
      // TODO: Debounce me.
      elem._visibleTabs = calculateVisibleTabs(elem);
    };
    window.addEventListener('resize', elem[resizeListener]);
  },
  detached(elem) {
    window.removeEventListener('resize', elem[resizeListener]);
  },
  render(elem) {
    const hasOverflowingTabs = elem._visibleTabs.length < elem.children.length;
    const buttonClasses = `${shadowStyles.locals.akTabLabel}
                           ${hasOverflowingTabs ? '' : shadowStyles.locals.akTabLabelHidden}`;
    return (
      <div>
        <style>{shadowStyles.toString()}</style>
        <ul
          className={shadowStyles.locals.akTabLabels}
          ref={el => (elem[labelsContainer] = el)}
        >
          {elem.children && elem.children.map(
            tab => {
              const ariaSelected = tab.selected ? 'true' : 'false';
              const tabIndex = tab.selected ? '0' : '-1';
              const isVisible = elem._visibleTabs.indexOf(tab) > -1;
              const classes = `${shadowStyles.locals.akTabLabel}
                               ${tab.selected ? shadowStyles.locals.akTabLabelSelected : ''}
                               ${isVisible ? '' : shadowStyles.locals.akTabLabelHidden}`;
              return (
                <li className={classes}>
                  <a
                    href="#"
                    aria-selected={ariaSelected}
                    tabIndex={tabIndex}
                    onclick={labelClickHandler(tab)}
                    onkeydown={labelKeydownHandler(elem, tab)}
                    ref={el => (tab[tabSymbols.tabLabel] = el)}
                  >{tab.label}</a>
                </li>
              );
            }
          ).concat(
            <li className={buttonClasses} ref={el => (elem[buttonContainer] = el)}>
              <a className={shadowStyles.locals.akTabsButton}>More</a>
            </li>
          )
        }
        </ul>
        <slot />
        <div>
          <hr />
          <p>Dropdown content:</p>
          <ul className={shadowStyles.locals.ddContainer}>
            {elem.children && elem.children.map(
              tab => {
                const isVisible = elem._visibleTabs.indexOf(tab) > -1;
                const classes = `${shadowStyles.locals.ddItem}
                                 ${tab.selected ? shadowStyles.locals.ddSelected : ''}
                                 ${isVisible ? shadowStyles.locals.ddHidden : ''}`;
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
      </div>
    );
  },
  props: {
    /** TODO: Use Symbol once supported in skate */
    _labels: prop.array({}),
    _selected: prop.array({}),
    _visibleTabs: prop.array({}),

    /**
     * @description Handler for selecting a tab.
     * @memberof Tabs
     * @instance
     * @type {Function}
     */
    onSelect: {
      default() {
        return e => {
          e.detail.tab.selected = true;
          if (e.detail.keyboardNav) {
            /* TODO: Ideally this would happen at render time in the ref callback, which would
               require us to set some state that is accessed in the render function. */
            setTimeout(() => {
              e.detail.tab[tabSymbols.tabLabel].focus();
            }, 50);
          }
        };
      },
    },
    /**
     * @description Handler for deselecting a tab.
     * @memberof Tabs
     * @instance
     * @type {Function}
     */
    onDeselect: {
      default() {
        return e => {
          e.detail.tab.selected = false;
        };
      },
    },
  },
};

export default define('ak-tabs', definition);
