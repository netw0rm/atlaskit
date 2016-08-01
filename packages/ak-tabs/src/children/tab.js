/** @jsx vdom */
import 'style!./tab-host.less';

import { emit, vdom, define, prop } from 'skatejs';
import shadowStyles from './tab-shadow.less';

const events = {
  /**
   * @event Tab#ak-tab-select
   * @memberof Tab
   * @description Fired when a tab is selected.
   * @property {Tab} detail.tab The tab element.
   * @property {Tab} detail.keyboardNav Whether the tab was selected via a key press.
   */
  EVENT_TAB_SELECT: 'ak-tab-select',
  /**
   * @event Tab#ak-tab-deselect
   * @memberof Tab
   * @description Fired when a tab is deselected.
   * @property {Tab} detail.tab The tab element.
   */
  EVENT_TAB_DESELECT: 'ak-tab-deselect',
  /**
   * @event Tab#ak-tab-change
   * @memberof Tab
   * @description Fired when a tab has changed.
   * @property {String} detail.label The tab label.
   * @property {Boolean} detail.selected Whether the tab is selected.
   * @private
   */
  EVENT_TAB_CHANGE: 'ak-tab-change',
};


function emitTabChangedEvent(elem) {
  emit(elem, events.EVENT_TAB_CHANGE, {
    detail: {
      label: elem.label,
      selected: elem.selected,
    },
  });
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
        <div class={shadowStyles.locals.akTabPane}>
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
      set: emitTabChangedEvent,
    }),
  },
};

export default define('ak-tab', definition);
export { events };
