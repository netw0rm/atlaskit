/* eslint no-underscore-dangle: 0 */
import 'style!./host.less';
import classNames from 'classnames';
import debounce from 'debounce';
import { vdom, define, prop } from 'skatejs';
import shadowStyles from './shadow.less';
import ResizeSensor from 'css-element-queries/src/ResizeSensor';

import * as helpers from './internal/tabs-helpers';
import * as handlers from './internal/tabs-handlers';
import * as events from './internal/events';
import * as i18n from './internal/i18n';
import Tab from './index-tab';
import Icon from 'ak-icon';
import Dropdown, { Item, DropdownTrigger } from 'ak-dropdown';

import { buttonContainer, labelsContainer } from './internal/symbols';
const resizeListener = Symbol();

const definition = {
  created(elem) {
    elem.addEventListener(events.TAB_SELECT, (e) => {
      helpers.getAllTabs(elem).filter(el => el !== e.target).forEach(el => (el.selected = false));
      helpers.updateProps(elem);
    });
    elem.addEventListener(events.TAB_DESELECT, () => {
      helpers.updateProps(elem);
    });
    elem.addEventListener(events.TAB_LABEL_CHANGE, () => {
      helpers.updateProps(elem);
    });
  },
  attached(elem) {
    // Re-render if necessary when the window is resized.
    elem[resizeListener] = new ResizeSensor(elem, debounce(() => (helpers.updateProps(elem)), 200));
  },
  detached(elem) {
    elem[resizeListener].detach();
  },
  render(elem) {
    const allTabs = helpers.getAllTabs(elem);
    let pos = 1;
    return (
      <div>
        <style>{shadowStyles.toString()}</style>
        <ul
          className={shadowStyles.locals.akTabLabels}
          role="tablist"
          ref={el => (elem[labelsContainer] = el)}
        >
          {allTabs && allTabs.map(
            tab => {
              const ariaSelected = `${!!tab.selected}`;
              const tabIndex = tab.selected ? '0' : '-1';
              const classes = classNames(shadowStyles.locals.akTabLabel, {
                [shadowStyles.locals.akTabLabelSelected]: tab.selected,
              });
              return (
                <li
                  className={classes}
                  tabIndex={tabIndex}
                  onkeydown={handlers.labelKeydownHandler(elem, tab)}
                  onmousedown={handlers.labelMouseDownHandler}
                  onclick={handlers.labelSelectedHandler(tab)}
                  aria-selected={ariaSelected}
                  aria-setsize={allTabs.length}
                  aria-posinset={pos++}
                  role="tab"
                  ref={handlers.labelRef(elem, tab)}
                >
                  <span>{tab.label}</span>
                </li>
              );
            }
          ).concat(
            <li
              className={shadowStyles.locals.akTabLabel}
              aria-hidden="true"
              ref={el => (elem[buttonContainer] = el)}
            >
              <Dropdown>
                <DropdownTrigger slot="trigger">
                  <a className={shadowStyles.locals.akTabsButton}>
                    <span>{i18n.more}</span>
                    <Icon glyph="expand" />
                  </a>
                </DropdownTrigger>
                {
                  allTabs && allTabs.map(tab => (
                    <Item
                      selected={false}
                      onSelected={handlers.labelSelectedHandler(tab)}
                      ref={handlers.dropdownItemRef(tab)}
                    >{tab.label}</Item>
                  ))
                }
              </Dropdown>
            </li>
          )
        }
        </ul>
        <slot />
      </div>
    );
  },
  rendered: helpers.showVisibleTabs,
  props: {
    /** TODO: Use Symbol once supported in skate */
    _labels: prop.array({}),
    _selected: prop.array({}),
  },
};

export default define('ak-tabs', definition);
export { Tab };
