import 'style!./host.less';

import { emit, prop, vdom, define } from 'skatejs';
import shadowStyles from './index.less';
import 'ak-blanket';
import './internal/ak-navigation-drawer';
import './internal/ak-navigation-drag';
import './index.ak-navigation-link';
import classNames from 'classnames';
import getSwipeType, { swipeLeft, swipeRight, noSwipe } from './internal/touch';
import resizer from './internal/resizer';
import {
  getContainerPadding,
  getNavigationWidth,
  getNavigationXOffset,
  getExpandedWidth,
  getCollapsedWidth,
} from './internal/collapse';
import keycode from 'keycode';
import 'custom-event-polyfill';
import * as events from './internal/index.events';
const {
  linkSelected: linkSelectedEvent,
  createDrawerSelected: createDrawerSelectedEvent,
  searchDrawerSelected: searchDrawerSelectedEvent,
  close: closeEvent,
  open: openEvent,
  widthChanged: widthChangedEvent,
} = events;

const shouldAnimateThreshold = 100; // ms
const resizerSymbol = Symbol('resizer');

// TODO: keyboard interaction
const searchDrawer = el => el.addEventListener('click', () => {
  emit(el, searchDrawerSelectedEvent);
});
const createDrawer = el => el.addEventListener('click', () => {
  emit(el, createDrawerSelectedEvent);
});

function closeAllDrawers(elem) {
  elem.createDrawerOpen = false;
  elem.searchDrawerOpen = false;
}

function isDrawerOpen(elem) {
  return elem.createDrawerOpen || elem.searchDrawerOpen;
}

function emitWidthChangedEvent(elem, oldWidth, newWidth) {
  emit(elem, widthChangedEvent, {
    detail: {
      oldWidth,
      newWidth,
    },
  });
}

function recomputeWidth(elem) {
  const newWidth = elem.open ? getExpandedWidth(elem) : getCollapsedWidth(elem);
  const oldWidth = elem.width;
  elem.width = newWidth;
  if (newWidth !== oldWidth) {
    emitWidthChangedEvent(elem, oldWidth, newWidth);
  }
}

/**
 * @description Create instances of the component programmatically, or using markup.
 * @class Navigation
 * @fires Navigation#createDrawerSelected
 * @fires Navigation#searchDrawerSelected
 * @fires Navigation#open
 * @fires Navigation#close
 * @fires Navigation#widthChanged
 * @fires Navigation#resizeStart
 * @fires Navigation#resizeEnd
 * @example @html <ak-navigation open collapsible />
 * @example @js import Navigation from 'ak-navigation';
 *
 * const navigation = new Navigation();
 * document.body.appendChild(navigation);
 */
export default define('ak-navigation', {
  render(elem) {
    return (
      <div>
        <style>{`
          .${shadowStyles.locals.navigation} {
            width: ${getNavigationWidth(elem)}px;
            transform: translateX(${getNavigationXOffset(elem)}px);
          }
          
          .${shadowStyles.locals.spacer} {
            width: ${getNavigationWidth(elem) + getNavigationXOffset(elem)}px;
          }

          .${shadowStyles.locals.containerName}, .${shadowStyles.locals.containerLinks} {
            transform: translateX(${getContainerPadding(elem.width)}px);
          }
      `}</style>
        <style>{shadowStyles.toString()}</style>
        <ak-blanket
          onActivate={() => closeAllDrawers(elem)}
          clickable={isDrawerOpen(elem)}
          className={classNames(shadowStyles.locals.blanket, {
            [shadowStyles.locals.blanketActive]: isDrawerOpen(elem),
          })}
        />
        <div className={classNames(shadowStyles.locals.spacer)} />
        <div
          className={classNames(shadowStyles.locals.navigation, {
            [shadowStyles.locals.open]: elem.open,
            [shadowStyles.locals.shouldAnimate]: elem.shouldAnimate,
          })}
        >
          <div className={shadowStyles.locals.global}>
            <div className={shadowStyles.locals.globalPrimary}>
              <a href={elem.productHref || false}>
                <slot name="global-home" />
              </a>
            </div>
            <div className={shadowStyles.locals.globalSecondary}>
              <div ref={searchDrawer} className={shadowStyles.locals.globalSecondaryItem}>
                <slot name="global-search" />
              </div>
              <div ref={createDrawer} className={shadowStyles.locals.globalSecondaryItem}>
                <slot name="global-create" />
              </div>
            </div>
            <div className={shadowStyles.locals.globalBottom}>
              <div className={shadowStyles.locals.globalSecondaryItem}>
                <slot name="global-help" />
              </div>
              <div className={shadowStyles.locals.globalSecondaryItem}>
                <slot name="global-profile" />
              </div>
            </div>
          </div>
          <ak-navigation-drawer large open={elem.searchDrawerOpen}>
            <slot name="global-search-drawer" />
          </ak-navigation-drawer>
          <ak-navigation-drawer open={elem.createDrawerOpen}>
            <slot name="global-create-drawer" />
          </ak-navigation-drawer>

          <div
            className={classNames(shadowStyles.locals.container, {
              [shadowStyles.locals.containerHidden]: elem.containerHidden,
            })}
          >
            {elem.containerName ? <div className={shadowStyles.locals.containerName}>
              <a href={elem.containerHref}>
                <img
                  className={shadowStyles.locals.containerLogo}
                  alt={elem.containerName}
                  src={elem.containerLogo || false}
                />
              </a>
              <a href={elem.containerHref} className={shadowStyles.locals.containerNameText}>
                {elem.containerName}
              </a>
            </div> : ''}
            <div className={shadowStyles.locals.containerLinks}>
              <slot />
            </div>
          </div>
          <ak-navigation-drag
            startDragCallback={elem[resizerSymbol].start}
            dragCallback={elem[resizerSymbol].resize}
            endDragCallback={elem[resizerSymbol].end}
          />
        </div>
      </div>
    );
  },
  props: {
    /**
     * @description Whether the component should display animations.
     * `shouldAnimate` is turned on after page load.
     * @memberof Navigation
     * @instance
     * @type {boolean}
     * @example @js navigation.shouldAnimate = true;
     */
    shouldAnimate: prop.boolean(),
    /**
     * @description The current width of the navigation component, in pixels
     * @memberof Navigation
     * @instance
     * @type {integer}
     * @example @js navigation.width = 80;
     * @example @html <ak-navigation width="80"/>;
     */
    width: prop.number({
      default: (elem) => getCollapsedWidth(elem),
    }),
    /**
     * @description The handler for the sidebar toggling behaviour.
     * The handler is bound on attach, and unbound on detach.
     * @memberof Navigation
     * @instance
     * @type {function}
     * @example @js navigation.toggleHandler = function() {};
     */
    toggleHandler: {
      default: (elem) => function toggleHandler(event) {
        if (!elem.collapsible) {
          return;
        }
        if (event.keyCode === keycode('[')) {
          elem.open = !elem.open;
        }
      },
    },
    /**
     * @description Whether the sidebar is in the `open` state.
     * Note that setting this to `false` will set both `navigation.createDrawerOpen` and
     * `navigation.searchDrawerOpen` to `false`, and may recompute the `navigation.width`.
     * @memberof Navigation
     * @instance
     * @type {boolean}
     * @example @js navigation.open = false;
     * @example @html <ak-navigation open="false"/>;
     */
    open: prop.boolean({
      attribute: true,
      set(elem, data) {
        if (!data.oldValue && data.newValue) {
          emit(elem, openEvent);
        } else if (data.oldValue && !data.newValue) {
          emit(elem, closeEvent);
        }
        elem.createDrawerOpen = elem.open && elem.createDrawerOpen;
        elem.searchDrawerOpen = elem.open && elem.searchDrawerOpen;
        recomputeWidth(elem);
      },
    }),
    /**
     * @description The name of the navigation container, displayed next to the container logo.
     * @memberof Navigation
     * @instance
     * @type {string}
     * @example @js navigation.containerName = 'Dashboard';
     * @example @html <ak-navigation container-name="Dashboard"/>;
     */
    containerName: prop.string({
      attribute: true,
    }),
    /**
     * @description The logo for the navigation container, displayed next to the container name.
     * @memberof Navigation
     * @instance
     * @type {string}
     * @example @js navigation.containerLogo = 'http://example.com/img.jpg';
     * @example @html <ak-navigation container-logo="http://example.com/img.jpg"/>;
     */
    containerLogo: prop.string({
      attribute: true,
    }),
    /**
     * @description The link that the container name and logo will reference.
     * @memberof Navigation
     * @instance
     * @type {string}
     * @example @js navigation.containerHref = 'http://example.com';
     * @example @html <ak-navigation container-href="http://example.com"/>;
     */
    containerHref: prop.string({
      attribute: true,
    }),
    /**
     * @description The name of the product glyph, to be placed in the global navigation.
     * See the ak-icon#glyph docs for more details.
     * @memberof Navigation
     * @instance
     * @type {string}
     * @example @js navigation.productLogo = 'bitbucket';
     * @example @html <ak-navigation product-logo="bitbucket"/>;
     */
    productLogo: prop.string({
      attribute: true,
    }),
    /**
     * @description The link that the product logo will reference
     * @memberof Navigation
     * @instance
     * @type {boolean}
     * @example @js navigation.productHref = 'http://example.com';
     * @example @html <ak-navigation product-href="http://example.com"/>;
     */
    productHref: prop.string({
      attribute: true,
    }),
    /**
     * @description Whether the navigation's container should be hidden at all times.
     * Note that this takes precedence over `navigation.open` – regardless of whether
     * `navigation.open` is `true`, the container will be hidden.
     * @memberof Navigation
     * @instance
     * @type {boolean}
     * @example @js navigation.containerHidden = true;
     * @example @html <ak-navigation container-hidden/>;
     */
    containerHidden: prop.boolean({
      attribute: true,
      set(elem) {
        recomputeWidth(elem);
      },
    }),
    /**
     * @description Whether the navigation is collapsible by the user.
     * If `navigation.collapsible === false`, it does not prevent direct
     *  manipulation of `navigation.open`.
     * @memberof Navigation
     * @instance
     * @type {string}
     * @example @js navigation.collapsible = 'http://example.com';
     * @example @html <ak-navigation collapsible/>;
     */
    collapsible: prop.boolean({
      attribute: true,
    }),
    /**
     * @description Whether the search drawer is open.
     * Note that setting this to `true` will set `navigation.createDrawerOpen` to `false`.
     * @memberof Navigation
     * @instance
     * @type {string}
     * @example @js navigation.searchDrawerOpen = true;
     * @example @html <ak-navigation search-drawer-open/>;
     */
    searchDrawerOpen: prop.boolean({
      set(elem, data) {
        if (data.newValue) {
          elem.createDrawerOpen = false;
        }
      },
    }),
    /**
     * @description Whether the create drawer is open.
     * Note that setting this to `true` will set `navigation.createDrawerOpen` to `false`.
     * @memberof Navigation
     * @instance
     * @type {string}
     * @example @js navigation.createDrawerOpen = true;
     * @example @html <ak-navigation create-drawer-open/>;
     */
    createDrawerOpen: prop.boolean({
      set(elem, data) {
        if (data.newValue) {
          elem.searchDrawerOpen = false;
        }
      },
    }),
  },
  attached(elem) {
    setTimeout(() => {
      elem.shouldAnimate = true;
    }, shouldAnimateThreshold);
    document.addEventListener('keyup', elem.toggleHandler);
    emitWidthChangedEvent(elem, null, elem.width);
  },
  detached(elem) {
    document.removeEventListener('keyup', elem.toggleHandler);
  },
  created(elem) {
    elem[resizerSymbol] = resizer(elem);
    elem.addEventListener(createDrawerSelectedEvent, () => {
      elem.createDrawerOpen = !elem.createDrawerOpen;
    });
    elem.addEventListener(searchDrawerSelectedEvent, () => {
      elem.searchDrawerOpen = !elem.searchDrawerOpen;
    });
    elem.addEventListener(linkSelectedEvent, (event) => {
      const containerLinks = Array.prototype.slice.call(elem.children);
      containerLinks.forEach((child) => { child.selected = false; });
      event.target.selected = true;
    });
    elem.addEventListener('touchstart', (event) => {
      elem.touchstart = event;
    });
    elem.addEventListener('touchend', (event) => {
      const swipeType = getSwipeType(elem.touchstart, event);
      if (swipeType === noSwipe) {
        return;
      }

      if (swipeType === swipeLeft) {
        elem.open = true;
      } else if (swipeType === swipeRight) {
        elem.open = false;
      }
    });
  },
});

export { events };
