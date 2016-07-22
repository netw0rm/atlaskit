/** @jsx vdom */
/* eslint no-underscore-dangle: 0 */
import 'style!./host.less';

import { vdom, define, prop } from 'skatejs';
import shadowStyles from './shadow.less';

import './children/tab';

/**
 * @description Tabs are an easy way to view and switch between different views of the same content.
 * @class Tabs
 * @example @js import Tabs from 'ak-tabs';
 * const component = new Tabs();
 */
const definition = {
  created(elem) {
    elem._children = [];

    // Listen for tab change event.
    elem.addEventListener('ak-tab-changed', e => {
      // Register the tab if it hasn't already been registered.
      if (elem._children.indexOf(e.target) < 0) {
        elem._children.push(e.target);
      }

      // If the tab has been selected, deselect all other tabs.
      if (e.target.selected) {
        elem.children.forEach(el => {
          if (el !== e.target) {
            el.selected = false;
          }
        });
      }

      elem._labels = elem._children.map(el => el.label);
      elem._selected = elem._children.map(el => el.selected);

      e.stopPropagation();
    });
  },
  render(elem) {
    return (
      <div>
        <style>{shadowStyles.toString()}</style>
        <div class="ak-tab-labels">
          {elem._children && elem._children.map(label => {
            const classes = `${shadowStyles.locals.akTabLabel}
                             ${label.selected ? shadowStyles.locals.akTabLabelSelected : ''}`;
            return (
              <a
                href="#"
                className={classes}
                onclick={function () { label.selected = true; }}
              >{label.label}</a>
            );
          })}
        </div>
        <slot />
      </div>
    );
  },
  props: {
    _labels: prop.array({}),
    _selected: prop.array({}),
  },
};

export default define('ak-tabs', definition);
