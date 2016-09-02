import 'style!./tab-host.less';
import classNames from 'classnames';
import { emit, vdom, define, prop, Component } from 'skatejs';
import shadowStyles from './tab-shadow.less';
import * as events from './internal/events';

// Keep track of prop changes so we can emit events when the component is updated.
const change = Symbol();

function emitTabChange(elem) {
  if (Object.keys(elem[change]).length) {
    emit(elem, events.TAB_CHANGE, {
      detail: {
        tab: elem,
        change: elem[change],
      },
    });
    elem[change] = {};
  }
}

function savePropChange(elem, data) {
  if (data.oldValue !== data.newValue) {
    elem[change][data.name] = data;
  }
}

/**
 * @description Tabs are an easy way to view and switch between different views of the same content.
 * @class Tab
 * @example @js import Tab from 'ak-tab';
 * const component = new Tab();
 */
const definition = {
  created(elem) {
    elem[change] = {};
  },
  updated(elem, prev) {
    const wasUpdated = Component.updated(elem, prev);
    if (wasUpdated) {
      emitTabChange(elem);
    }
    return wasUpdated;
  },
  render(elem) {
    const ariaHidden = `${!!elem.selected}`;
    return (
      <div aria-hidden={ariaHidden}>
        <style>{shadowStyles.toString()}</style>
        <div
          className={classNames(shadowStyles.locals.akTabPane, {
            [shadowStyles.locals.selected]: elem.selected,
          })}
          role="tabpanel"
        >
          <slot />
        </div>
      </div>
    );
  },
  attached: emitTabChange,
  detached: emitTabChange,
  props: {
    /**
     * @description The label to display in the tab navigation
     * @memberof Tab
     * @instance
     * @type {string}
     */
    label: prop.string({
      attribute: true,
      set: savePropChange,
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
        data.oldValue = !!data.oldValue;  // Coerce initial value of null to false.
        savePropChange(elem, data);
      },
    }),
  },
};

export default define('ak-tabs-tab', definition);
