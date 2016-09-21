import 'style!./host.less';

import { emit, prop, vdom, define } from 'skatejs';
import shadowStyles from './index.less';
import 'ak-blanket';
import './ak-navigation-drawer';
import './ak-navigation-link';
import classNames from 'classnames';
import getSwipeType, { swipeLeft, swipeRight, noSwipe } from './touch';
import keycode from 'keycode';
import 'custom-event-polyfill';
import * as events from './internal/events';
const {
  linkSelected: linkSelectedEvent,
  createDrawerSelected: createDrawerSelectedEvent,
  searchDrawerSelected: searchDrawerSelectedEvent,
  close: closeEvent,
  open: openEvent,
  openStateChanged: openStateChangedEvent,
} = events;

const shouldAnimateThreshold = 100; // ms
const globalCollapsedWidth = 60; // px this is duplicated in shared-variables.less
const containerCollapsedWidth = 60; // px this is duplicated in shared-variables.less
const expandedWidth = 280; // px this is duplicated in shared-variables.less

const intermediateWidth = globalCollapsedWidth + containerCollapsedWidth;
const collapsedWidth = globalCollapsedWidth;


const containerPaddingExpanded = 20; // px this is duplicated in shared-variables.less
const containerPaddingCollapsed = 10;
// start collapsing the padding 16px out
const containerPaddingCollapseStart = intermediateWidth + 16;

function getContainerPadding(width) {
  const paddingDelta = containerPaddingExpanded - containerPaddingCollapsed;
  const gradient = paddingDelta / (containerPaddingCollapseStart - intermediateWidth);
  const padding = gradient * width + (paddingDelta - gradient * intermediateWidth);

  return Math.min(containerPaddingExpanded, Math.max(containerPaddingCollapsed, padding));
}
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
              width: ${Math.max(elem.width, intermediateWidth)}px;
              transform: translateX(${Math.min(elem.width - intermediateWidth, 0)}px);
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

          <div className={shadowStyles.locals.container}>
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
      default: collapsedWidth,
    }),
    toggleHandler: {
      default: (elem) => function toggleHandler(event) {
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
        elem.width = elem.open ? expandedWidth : collapsedWidth;
      },
      event: openStateChangedEvent,
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
  },
  detached(elem) {
    document.removeEventListener('keyup', elem.toggleHandler);
  },
  created(elem) {
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
