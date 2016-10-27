import classNames from 'classnames';
import { emit, vdom, define, prop, Component } from 'skatejs';
import shadowStyles from './tab-shadow.less';
import { tabChange as tabChangeEvent } from './internal/index.events';

/**
 * @description The Tab element, managed and displayed as children of the Tabs element.
 * @class Tab
 * @example @js import { Tab } from 'ak-tabs';
 * const myTab = new Tab();
 * myTabs.appendChild(myTab);
 * @example @html <ak-tabs>
 *   <ak-tabs-tab label="My tab" selected>
 *     <h1>Hello world</h1>
 *     <p>This is my first tab.</p>
 *   </ak-tabs-tab>
 * </ak-tabs>
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
     * @description The label to display in the tab navigation bar.
     * @memberof Tab
     * @instance
     * @type {string}
     * @example @js const myTab = new Tab();
     * myTab.label = 'My label';
     */
    label: prop.string({
      attribute: true,
    }),
    /**
     * @description Whether the tab is selected. Only one tab can be selected at a time.
     * Selecting a tab will deselect any selected sibling tabs.
     * @memberof Tab
     * @instance
     * @type {Boolean}
     * @example @js const myTab = new Tab();
     * myTab.selected = true;
     */
    selected: prop.boolean({
      attribute: true,
    }),
  },
};

export default define('ak-tabs-tab', definition);
