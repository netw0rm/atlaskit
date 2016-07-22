/** @jsx vdom */
import 'style!./tab-host.less';

import { emit, vdom, define, prop } from 'skatejs';
import shadowStyles from './tab-shadow.less';

function emitTabChangedEvent(elem) {
  emit(elem, 'ak-tab-changed', {
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
  render() {
    return (
      <div>
        <style>{shadowStyles.toString()}</style>
        <slot />
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
     * @description Whether the tab is selected.
     * @memberof Tab
     * @instance
     */
    selected: prop.boolean({
      attribute: true,
      set: emitTabChangedEvent,
    }),
  },
};

export default define('ak-tab', definition);
