/** @jsx vdom */

import { vdom, define, prop, emit } from 'skatejs';
import classNames from 'classnames';
import keycode from 'keycode';

import shadowStyles from './index.ak-navigation-link.less';
import { linkSelected as linkSelectedEvent } from './internal/index.events';

function select(elem) {
  emit(elem, linkSelectedEvent);
}

/**
 * @description Create instances of the component programmatically, or using markup.
 * @class NavigationLink
 * @fires Navigation#linkSelected
 * @example @html <ak-navigation-link>
 *    <ak-icon gylph="bitbucket" slot="icon"/>
 *    Bitbucket
 * </ak-navigation-link>
 */
export default define('ak-navigation-link', {
  created(elem) {
    elem.addEventListener('click', () => select(elem));
    elem.addEventListener('keyup', (event) => {
      if (event.keyCode === keycode('enter')) {
        select(elem);
      }
    });
  },
  render(elem) {
    return (
      <div
        className={classNames(shadowStyles.locals.wrapper, {
          [shadowStyles.locals.selected]: elem.selected,
        })}
      >
        <style>{shadowStyles.toString()}</style>
        <a
          className={classNames(shadowStyles.locals.link, shadowStyles.locals.iconSlotWrapper)}
          href={elem.href || false}
          onmousedown={e => e.preventDefault()}
          tabindex="0"
        >
          <slot
            name="icon"
            className={shadowStyles.locals.iconSlotElement}
          />
          <div
            className={classNames(shadowStyles.locals.text)}
          >
            <slot />
          </div>
        </a>
      </div>
    );
  },
  props: {
    /**
     * @description The link that the NavigationLink references.
     * @memberof NavigationLink
     * @instance
     * @type {string}
     * @example @js navigationLink.href = 'http://example.com';
     * @example @html <ak-navigation-link href="http://example.com"/>;
     */
    href: prop.string({
      attribute: true,
    }),
    /**
     * @description Whether the navigation is currently selected,
     * which is `true` if the user has clicked on the link.
     * This will be set to `true` on selection, and set to false
     * when other NavigationLink in the same navigation becomes selected.
     * @memberof NavigationLink
     * @instance
     * @type {boolean}
     * @example @js navigationLink.selected = true;
     * @example @html <ak-navigation-link selected/>;
     */
    selected: prop.boolean({
      attribute: true,
    }),
  },
});
