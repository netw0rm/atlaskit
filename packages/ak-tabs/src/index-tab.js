import 'style!./tab-host.less';
import classNames from 'classnames';
import { emit, vdom, define, prop, Component } from 'skatejs';
import shadowStyles from './tab-shadow.less';
import { tabChange as tabChangeEvent } from './internal/events';

/**
 * @description Tabs are an easy way to view and switch between different views of the same content.
 * @class Tab
 * @example @js import Tab from 'ak-tab';
 * const component = new Tab();
 */
const definition = {
  updated(elem, prev) {
    const wasUpdated = Component.updated(elem, prev);
    if (wasUpdated) {
      emit(elem, tabChangeEvent);
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
  props: {
    /**
     * @description The label to display in the tab navigation
     * @memberof Tab
     * @instance
     * @type {string}
     */
    label: prop.string({
      attribute: true,
    }),
    /**
     * @description Whether the tab is selected. Only one tab can be selected at a time,
     * @memberof Tab
     * @instance
     * @type {Boolean}
     */
    selected: prop.boolean({
      attribute: true,
    }),
  },
};

export default define('ak-tabs-tab', definition);
