/** @jsx vdom */
import 'style!./tab-host.less';

import { emit, vdom, define, prop } from 'skatejs';
import shadowStyles from './tab-shadow.less';

const events = {
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

function emitTabChangedEvent(tab, detail) {
  emit(tab, events.EVENT_TAB_CHANGE, { detail });
}

/**
 * @description Tabs are an easy way to view and switch between different views of the same content.
 * @class Tab
 * @example @js import Tab from 'ak-tab';
 * const component = new Tab();
 */
const definition = {
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
  attached(elem) {
    emitTabChangedEvent(elem, { tab: elem });
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
        if (data.oldValue !== data.newValue) {
          emitTabChangedEvent(elem, {
            tab: elem,
            label: elem.label,
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
        if (data.oldValue !== data.newValue) {
          emitTabChangedEvent(elem, {
            tab: elem,
            selected: elem.selected,
          });
        }
      },
    }),
  },
};

export default define('ak-tabs-tab', definition);
export { events };
