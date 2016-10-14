import { vdom, define, prop, emit } from 'skatejs';
import { style } from 'akutil-common';
import shadowStyles from './index.ak-navigation-link.less';
import classNames from 'classnames';
import keycode from 'keycode';
import { linkSelected as linkSelectedEvent } from './internal/index.events';

const anchorElement = Symbol('anchor');

function select(elem) {
  emit(elem, linkSelectedEvent);
  if (elem.href) {
    elem[anchorElement].click();
  }
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
    style(vdom, {
      [`.${shadowStyles.locals.icon}::slotted(*)`]: {
        display: 'inline-block',
        'margin-left': '10px',
        'margin-right': '20px',
        position: 'relative',
        width: '20px',
      },
    });

    return (
      <div
        className={classNames(shadowStyles.locals.wrapper, {
          [shadowStyles.locals.selected]: elem.selected,
        })}
      >
        <style>{shadowStyles.toString()}</style>
        <a
          className={classNames(shadowStyles.locals.link)}
          href={elem.href}
          ref={(a) => { elem[anchorElement] = a; }}
          tabindex="0"
        >
          <slot
            name="icon"
            className={shadowStyles.locals.icon}
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
