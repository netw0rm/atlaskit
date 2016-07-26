/** @jsx vdom */
/* eslint no-underscore-dangle: 0 */
import 'style!./host.less';

import { vdom, define, prop, emit } from 'skatejs';
import shadowStyles from './shadow.less';

import Tab, { EVENT_TAB_CHANGE } from './children/tab'; // eslint-disable-line no-unused-vars

const EVENT_TAB_SELECT = 'ak-tab-select';
const EVENT_TAB_DESELECT = 'ak-tab-deselect';

/**
 * Helper function. Takes a label element and returns a handler that emits a event.
 * @param label
 * @returns {Function}
 */
function labelClickHandler(label) {
  return () => {
    if (!label.selected) {
      emit(label, EVENT_TAB_SELECT, { detail: { label } });
    }
  };
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
            emit(labelToDeselect, EVENT_TAB_DESELECT, { detail: { label: labelToDeselect } });
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
        <div className={shadowStyles.locals.akTabLabels}>
          {elem.children && elem.children
            .filter(child => !!child.label)
            .map(label => {
              const classes = `${shadowStyles.locals.akTabLabel}
                               ${label.selected ? shadowStyles.locals.akTabLabelSelected : ''}`;
              return (
                <a
                  href="#"
                  className={classes}
                  onclick={labelClickHandler(label)}
                >{label.label}</a>
              );
            })
          }
        </div>
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
          e.detail.label.selected = true;
        };
      },
    },
    /**
     * Handler for deselecting a tab..
     */
    onDeselect: {
      default() {
        return e => {
          e.detail.label.selected = false;
        };
      },
    },
  },
};

export default define('ak-tabs', definition);
