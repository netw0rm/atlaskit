/** @jsx vdom */
import 'style!./tab-host.less';

import { emit, vdom, define, prop } from 'skatejs';
import shadowStyles from './tab-shadow.less';

const EVENTS = {
  /**
   * @event Tab#ak-tabs-tab-select
   * @memberof Tab
   * @description Fired when a tab is selected.
   * @property {Tab} detail.tab The tab element.
   */
  EVENT_TAB_SELECT: 'ak-tabs-tab-select',
  /**
   * @event Tab#ak-tabs-tab-deselect
   * @memberof Tab
   * @description Fired when a tab is deselected.
   * @property {Tab} detail.tab The tab element.
   */
  EVENT_TAB_DESELECT: 'ak-tabs-tab-deselect',
  /**
   * @event Tab#ak-tabs-tab-change
   * @memberof Tab
   * @description Fired when a tab has changed.
   * @property {Tab} detail.tab The tab element.
   * @private
   */
  EVENT_TAB_CHANGE: 'ak-tabs-tab-change',
};

// We need to keep track of whether the element has rendered before, so we know whether it is safe
// to emit events in the property setter.
const hasRendered = Symbol();

function emitTabChangedEvent(tab, detail) {
  emit(tab, EVENTS.EVENT_TAB_CHANGE, { detail });
}

/**
 * @description Tabs are an easy way to view and switch between different views of the same content.
 * @class Tab
 * @example @js import Tab from 'ak-tab';
 * const component = new Tab();
 */
const definition = {
  created(elem) {
    elem[hasRendered] = false;
  },
  render(elem) {
    const ariaHidden = elem.selected ? 'false' : 'true';
    return (
      <div aria-hidden={ariaHidden}>
        <style>{shadowStyles.toString()}</style>
        <div class={shadowStyles.locals.akTabPane} role="tabpanel">
          <slot />
        </div>
      </div>
    );
  },
  rendered(elem) {
    if (!elem[hasRendered]) {
      const changed = {};
      ['label', 'selected'].filter(propName => elem[propName]).forEach(propName => {
        changed[propName] = { name: propName, oldValue: null, newValue: elem[propName] };
      });
      emitTabChangedEvent(elem, {
        tab: elem,
        change: changed,
      });
      elem[hasRendered] = true;
    }
  },
  props: {
    /**
     * @description The label to display in the tab navigation
     * @memberof Tab
     * @instance
     * @type {string}
     */
    label: prop.string({
      attribute: true,
      set(elem, data) {
        if (data.oldValue !== data.newValue && elem[hasRendered]) {
          emitTabChangedEvent(elem, {
            tab: elem,
            change: {
              label: data,
            },
          });
        }
      },
    }),
    /**
     * @description Whether the tab is selected. Only one tab can be selected at a time,
     * @memberof Tab
     * @instance
     * @type {Boolean}
     */
    selected: prop.boolean({
      attribute: true,
      set(elem, data) {
        if (data.oldValue !== data.newValue && elem[hasRendered]) {
          emitTabChangedEvent(elem, {
            tab: elem,
            change: {
              selected: data,
            },
          });
        }
      },
    }),
  },
};

export default define('ak-tabs-tab', definition);
export { EVENTS };
