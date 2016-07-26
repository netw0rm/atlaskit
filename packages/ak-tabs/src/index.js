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
    // Listen for tab change event.
    elem.addEventListener('ak-tab-changed', e => {
      // If the tab has been selected, deselect all other tabs.
      if (e.target.selected) {
        elem.children.forEach(el => {
          if (el !== e.target) {
            el.selected = false;
          }
        });
      }

      // Set the property to trigger a re-render.
      elem._labels = elem.children.map(el => el.label);
      elem._selected = elem.children.map(el => el.selected);

      e.stopPropagation();
    });
  },
  render(elem) {
    return (
      <div>
        <style>{shadowStyles.toString()}</style>
        <div className={shadowStyles.locals.akTabItems}>
          {elem.children && elem.children
            .filter(child => child.nodeName === 'AK-TAB' && child.hasAttribute('defined'))
            .map(label => {
              const classes = `${shadowStyles.locals.akTabItem}
                               ${label.selected ? shadowStyles.locals.akTabItemSelected : ''}`;
              return (
                <a
                  href="#"
                  className={classes}
                  onclick={function () { label.selected = true; }}
                >{label.label}</a>
              );
            })
          }
        </div>
        <slot />
      </div>
    );
  },
  props: {
    /** TODO: Use Symbol once supported in skate */
    _labels: prop.array({}),
    /** TODO: Use Symbol once supported in skate */
    _selected: prop.array({}),
  },
};

export default define('ak-tabs', definition);
