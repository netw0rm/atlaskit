import 'style!./tab-host.less';

import { emit, vdom, define, prop } from 'skatejs';
import shadowStyles from './tab-shadow.less';
import * as events from './internal/events';

// We need to keep track of whether the element has rendered before, so we know whether it is safe
// to emit events in the property setter.
const hasRendered = Symbol();

function emitTabChangedEvent(tab, detail) {
  emit(tab, events.TAB_CHANGE, { detail });
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
    const ariaHidden = `${!!elem.selected}`;
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
