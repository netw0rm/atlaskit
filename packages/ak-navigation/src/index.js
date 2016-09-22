import 'style!./host.less';

import { emit, prop, vdom, define } from 'skatejs';
import shadowStyles from './index.less';
import 'ak-blanket';
import './ak-navigation-drawer';
import './ak-navigation-link';
import classNames from 'classnames';
import getSwipeType, { swipeLeft, swipeRight, noSwipe } from './internal/touch';
import {
  getContainerPadding,
  getNavigationWidth,
  getNavigationXOffset,
  getExpandedWidth,
  getCollapsedWidth,
} from './internal/collapse';
import keycode from 'keycode';
import 'custom-event-polyfill';
import * as events from './internal/events';
const {
  linkSelected: linkSelectedEvent,
  createDrawerOpen: createDrawerOpenEvent,
  searchDrawerOpen: searchDrawerOpenEvent,
  close: closeEvent,
  open: openEvent,
  widthChanged: widthChangedEvent,
} = events;

const shouldAnimateThreshold = 100; // ms

// TODO: keyboard interaction
const openSearchDrawer = el => el.addEventListener('click', () => {
  emit(el, searchDrawerOpenEvent);
});
const openCreateDrawer = el => el.addEventListener('click', () => {
  emit(el, createDrawerOpenEvent);
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

export default define('ak-navigation', {
  render(elem) {
    return (
      <div>
        <ak-blanket
          onActivate={() => closeAllDrawers(elem)}
          clickable={isDrawerOpen(elem)}
          className={classNames(shadowStyles.locals.blanket, {
            [shadowStyles.locals.blanketActive]: isDrawerOpen(elem),
          })}
        />
        <div
          className={classNames(shadowStyles.locals.navigation, {
            [shadowStyles.locals.open]: elem.open,
            [shadowStyles.locals.shouldAnimate]: elem.shouldAnimate,
          })}
        >
          <style>{`
            .${shadowStyles.locals.navigation} {
              width: ${getNavigationWidth(elem)}px;
              transform: translateX(${getNavigationXOffset(elem)}px);
            }

            .${shadowStyles.locals.containerName}, .${shadowStyles.locals.containerLinks} {
              transform: translateX(${getContainerPadding(elem.width)}px);
            }
          `}</style>
          <style>{shadowStyles.toString()}</style>
          <div className={shadowStyles.locals.global}>
            <div className={shadowStyles.locals.globalPrimary}>
              <a href={elem.productHref || false}>
                <slot name="global-home" />
              </a>
            </div>
            <div className={shadowStyles.locals.globalSecondary}>
              <div ref={openSearchDrawer} className={shadowStyles.locals.globalSecondaryItem}>
                <slot name="global-search" />
              </div>
              <div ref={openCreateDrawer} className={shadowStyles.locals.globalSecondaryItem}>
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
              <span className={shadowStyles.locals.containerNameText}>{elem.containerName}</span>
            </div> : ''}
            <div className={shadowStyles.locals.containerLinks}>
              <slot />
            </div>
          </div>
        </div>
      </div>
    );
  },
  props: {
    /** TODO: make these private, see https://github.com/skatejs/skatejs/issues/687 **/
    shouldAnimate: prop.boolean(),
    width: prop.number({
      default: (elem) => getCollapsedWidth(elem),
    }),
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
    containerName: prop.string({
      attribute: true,
    }),
    containerLogo: prop.string({
      attribute: true,
    }),
    containerHref: prop.string({
      attribute: true,
    }),
    productLogo: prop.string({
      attribute: true,
    }),
    productHref: prop.string({
      attribute: true,
    }),
    containerHidden: prop.boolean({
      attribute: true,
      set(elem) {
        recomputeWidth(elem);
      },
    }),
    collapsible: prop.boolean({
      attribute: true,
    }),
    searchDrawerOpen: prop.boolean({
      set(elem, data) {
        if (data.newValue) {
          elem.createDrawerOpen = false;
        }
      },
    }),
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
    elem.addEventListener(createDrawerOpenEvent, () => {
      elem.createDrawerOpen = true;
    });
    elem.addEventListener(searchDrawerOpenEvent, () => {
      elem.searchDrawerOpen = true;
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
