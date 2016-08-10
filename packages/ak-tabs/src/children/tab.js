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

const symbols = {
  tabLabel: Symbol(),
};

function emitTabChangedEvent(tab) {
  emit(tab, events.EVENT_TAB_CHANGE, { detail: { tab } });
}

function emitTabSelectionEvent(tab, isSelected) {
  const eventName = isSelected ? events.EVENT_TAB_SELECT : events.EVENT_TAB_DESELECT;
  emit(tab, eventName, { detail: { tab } });
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
    emitTabChangedEvent(elem);
  },
  props: {
    /**
     * @description The label to display in the tab navigation
     * @memberof Tab
     * @instance
     * @type {string}
     */
    label: {
      attribute: true,
      set: emitTabChangedEvent,
    },
    /**
     * @description Whether the tab is selected. Only one tab can be selected at a time,
     * @memberof Tab
     * @instance
     * @type {Boolean}
     */
    selected: prop.boolean({
      attribute: true,
      set(elem, data) {
        emitTabChangedEvent(elem);
        emitTabSelectionEvent(elem, data.newValue);
      },
    }),
  },
};

export default define('ak-tabs-tab', definition);
export { events, symbols };
