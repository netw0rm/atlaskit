/** @jsx vdom */
/* eslint no-underscore-dangle: 0 */
import 'style!./host.less';

import { vdom, define, prop, emit } from 'skatejs';
import shadowStyles from './shadow.less';

import Tab, { events as tabEvents } from './children/tab'; // eslint-disable-line no-unused-vars

const tabLabel = Symbol();
const labelsContainer = Symbol();

/**
 * Helper function. Takes a tab element and returns a handler that emits a event.
 * @param tab
 * @returns {Function}
 */
function labelClickHandler(tab) {
  return () => {
    if (!tab.selected) {
      emit(tab, tabEvents.EVENT_TAB_SELECT, { detail: { tab } });
    }
  };
}

function findTab(tabs, current, offset) {
  const all = tabs.children.filter(el => el.label);

  let index = all.indexOf(current) + offset;
  if (index > all.length - 1) {
    index = all.length - 1;
  } else if (index < 0) {
    index = 0;
  }

  return all[index];
}

/**
 * Helper function. Returns a handler that handles a keydown event on a label.
 * @param tabs
 * @param tab
 * @returns {Function}
 */
function labelKeydownHandler(tabs, tab) {
  return e => {
    let tabToSelect;
    if (e.keyCode === 37 /* LEFT */) {
      tabToSelect = findTab(tabs, tab, -1);
    } else if (e.keyCode === 39 /* RIGHT */) {
      tabToSelect = findTab(tabs, tab, 1);
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

/**
 * Helper function. Hide or show the start and end fade overlays if required.
 * TODO: Needs to be done on page resize.
 * @param scrollContainer The scrolling container element.
 */
function updateScrollFade(scrollContainer) {
  const hasOverflow = scrollContainer.scrollWidth > scrollContainer.getBoundingClientRect().width;
  if (hasOverflow) {
    const maxScroll = scrollContainer.scrollWidth - scrollContainer.clientWidth;
    const currScroll = scrollContainer.scrollLeft;

    if (currScroll === 0) {
      scrollContainer.classList.remove(shadowStyles.locals.akTabLabelsFadeStart);
    } else {
      scrollContainer.classList.add(shadowStyles.locals.akTabLabelsFadeStart);
    }

    if (Math.abs(currScroll - maxScroll) < 1) {
      scrollContainer.classList.remove(shadowStyles.locals.akTabLabelsFadeEnd);
    } else {
      scrollContainer.classList.add(shadowStyles.locals.akTabLabelsFadeEnd);
    }
  } else {
    scrollContainer.classList.remove(shadowStyles.locals.akTabLabelsFadeEnd);
    scrollContainer.classList.remove(shadowStyles.locals.akTabLabelsFadeStart);
  }
}

function labelScrollHandler(e) {
  if (e.wheelDelta > 0) {
    this.scrollLeft -= 10;
  } else if (e.wheelDelta < 0) {
    this.scrollLeft += 10;
  }

  updateScrollFade(this);
}

function labelFocusHandler(tabs) {
  return () => {
    // Need to wait for the scroll
    setTimeout(() => {
      updateScrollFade(tabs[labelsContainer]);
    }, 50);
  };
}

function getLabelForTab(tab) {
  return tab[tabLabel];
}

function generateTabLabels(tabsEl) {
  return tabsEl.children ?
    tabsEl.children
    .filter(child => !!child.label)
    .map(tab => {
      const classes = `${shadowStyles.locals.akTabLabel}
                       ${tab.selected ? shadowStyles.locals.akTabLabelSelected : ''}`;
      const ariaSelected = tab.selected ? 'true' : 'false';
      const tabIndex = tab.selected ? '0' : '-1';
      const ref = el => {
        tab[tabLabel] = el;
      };
      return (
        <li className={classes}>
          <a
            href="#"
            onclick={labelClickHandler(tab)}
            onkeydown={labelKeydownHandler(tabsEl, tab)}
            onfocus={labelFocusHandler(tabsEl)}
            aria-selected={ariaSelected}
            tabIndex={tabIndex}
            ref={ref}
          >{tab.label}</a>
        </li>
      );
    }) : '';
}

/**
 * @description Tabs are an easy way to view and switch between different views of the same content.
 * @class Tabs
 * @example @js import Tabs from 'ak-tabs';
 * const tabs = new Tabs();
 */
const definition = {
  created(elem) {
    // Call the onSelect or onDeselect handler when the matching event is fired.
    elem.addEventListener(tabEvents.EVENT_TAB_SELECT, e => { elem.onSelect(e); });
    elem.addEventListener(tabEvents.EVENT_TAB_DESELECT, e => { elem.onDeselect(e); });

    /* When a tab is changed, we need to emit an event to deselect any previously-selected tab,
     * and update properties to re-render.
     */
    elem.addEventListener(tabEvents.EVENT_TAB_CHANGE, e => {
      // If the tab has been selected, we need to deselect all other tabs.
      const targetLabel = e.target;
      if (targetLabel.selected) {
        elem.children
          .filter(el => !!el.selected && el !== targetLabel)
          .forEach(labelToDeselect => {
            emit(
              labelToDeselect,
              tabEvents.EVENT_TAB_DESELECT,
              { detail: { tab: labelToDeselect } }
            );
          });
      }

      // Update our properties to trigger a re-render if required.
      elem._labels = elem.children.map(el => el.label);
      elem._selected = elem.children.map(el => el.selected);

      e.stopPropagation();
    });
  },
  attached(elem) {
    // If there is no selected tab, try to select the first tab.
    if (!elem.children.some(el => el.label && el.selected)) {
      const tab = elem.children.find(el => el.label);
      if (tab) {
        emit(tab, tabEvents.EVENT_TAB_SELECT, { detail: { tab } });
      }
    }
  },
  render(elem) {
    const labelsRef = el => {
      elem[labelsContainer] = el;
      updateScrollFade(el);
    };
    return (
      <div>
        {elem.children.length ?
          <div className={shadowStyles.locals.akTabLabelsContainer}>
            <style>{shadowStyles.toString()}</style>
            <ul
              className={shadowStyles.locals.akTabLabels}
              onmousewheel={labelScrollHandler}
              ref={labelsRef}
            >
              {generateTabLabels(elem)}
            </ul>
            <div className={shadowStyles.locals.akTabLabelsFadeStartOverlay}></div>
            <div className={shadowStyles.locals.akTabLabelsFadeEndOverlay}></div>
          </div> : ''
        }
        <slot />
      </div>
    );
  },
  props: {
    /** TODO: Use Symbol once supported in skate */
    _labels: prop.array({}),
    /** TODO: Use Symbol once supported in skate */
    _selected: prop.array({}),
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
            getLabelForTab(e.detail.tab).focus();
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
