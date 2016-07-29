/** @jsx vdom */
/* eslint no-underscore-dangle: 0 */
import 'style!./host.less';

import { vdom, define, prop, emit } from 'skatejs';
import shadowStyles from './shadow.less';

import Tab, { EVENT_TAB_CHANGE } from './children/tab'; // eslint-disable-line no-unused-vars

const EVENT_TAB_SELECT = 'ak-tab-select';
const EVENT_TAB_DESELECT = 'ak-tab-deselect';

const tabLabel = Symbol();

/**
 * Helper function. Takes a tab element and returns a handler that emits a event.
 * @param tab
 * @returns {Function}
 */
function labelClickHandler(tab) {
  return () => {
    if (!tab.selected) {
      emit(tab, EVENT_TAB_SELECT, { detail: { tab } });
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
      emit(tabToSelect, EVENT_TAB_SELECT, { detail: { tab: tabToSelect, keyboardNav: true } });
    }
  };
}

function getLabelForTab(tab) {
  return tab[tabLabel];
}

/**
 * @description Tabs are an easy way to view and switch between different views of the same content.
 * @class Tabs
 * @example @js import Tabs from 'ak-tabs';
 * const component = new Tabs();
 */
const definition = {
  created(elem) {
    // Call the onSelect or onDeselect handler when the matching event is fired.
    elem.addEventListener(EVENT_TAB_SELECT, e => { elem.onSelect(e); });
    elem.addEventListener(EVENT_TAB_DESELECT, e => { elem.onDeselect(e); });

    /* When a tab is changed, we need to emit an event to deselect any previously-selected tab,
     * and update properties to re-render.
     */
    elem.addEventListener(EVENT_TAB_CHANGE, e => {
      // If the tab has been selected, we need to deselect all other tabs.
      const targetLabel = e.target;
      if (targetLabel.selected) {
        elem.children
          .filter(el => !!el.selected && el !== targetLabel)
          .forEach(labelToDeselect => {
            emit(labelToDeselect, EVENT_TAB_DESELECT, { detail: { tab: labelToDeselect } });
          });
      }

      // Update our properties to trigger a re-render if required.
      elem._labels = elem.children.map(el => el.label);
      elem._selected = elem.children.map(el => el.selected);

      e.stopPropagation();
    });
  },
  render(elem) {
    return (
      <div>
        <style>{shadowStyles.toString()}</style>
        <ul className={shadowStyles.locals.akTabLabels}>
          {elem.children && elem.children
            .filter(child => !!child.label)
            .map(tab => {
              const classes = `${shadowStyles.locals.akTabLabel}
                               ${tab.selected ? shadowStyles.locals.akTabLabelSelected : ''}`;
              const ariaSelected = tab.selected ? 'true' : 'false';
              const tabIndex = tab.selected ? '0' : '-1';
              const ref = el => { tab[tabLabel] = el; };
              return (
                <li className={classes}>
                  <a
                    href="#"
                    onclick={labelClickHandler(tab)}
                    onkeydown={labelKeydownHandler(elem, tab)}
                    aria-selected={ariaSelected}
                    tabIndex={tabIndex}
                    ref={ref}
                  >{tab.label}</a>
                </li>
              );
            })
          }
        </ul>
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
     * Handler for selecting a tab..
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
     * Handler for deselecting a tab..
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
