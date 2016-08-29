/** @jsx vdom */
import 'style!./host.less';

import { emit, prop, vdom, define } from 'skatejs';
import shadowStyles from './index.less';
import './ak-navigation-drawer';
import './ak-navigation-link';
import classNames from 'classnames';
import getSwipeType, { swipeLeft, swipeRight, noSwipe } from './touch';
import keycode from 'keycode';

const shouldAnimateThreshold = 100; // ms
const globalCollapsedWidth = 60; // px
const containerCollapsedWidth = 60; // px
const expandedWidth = 280; // px

const intermediateWidth = globalCollapsedWidth + containerCollapsedWidth;
const collapsedWidth = globalCollapsedWidth;


const containerPaddingExpanded = 20;
const containerPaddingCollapsed = 10;
// start collapsing the padding 16px out
const containerPaddingCollapseStart = intermediateWidth + 16;

function getContainerPadding(width) {
  const paddingDelta = containerPaddingExpanded - containerPaddingCollapsed;
  const gradient = (containerPaddingExpanded - containerPaddingCollapsed)
    / (containerPaddingCollapseStart - intermediateWidth);

  const padding = gradient * width + (paddingDelta - gradient * intermediateWidth);

  return Math.min(containerPaddingExpanded, Math.max(containerPaddingCollapsed, padding));
}
// TODO: keyboard interaction
const openSearchDrawer = el => el.addEventListener('click', () => {
  emit(el, 'ak-navigation-search-drawer-open');
});
const openCreateDrawer = el => el.addEventListener('click', () => {
  emit(el, 'ak-navigation-create-drawer-open');
});

export default define('ak-navigation', {
  render(elem) {
    return (
      <div>
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
              <slot name="global-home" />
            </div>
            <div ref={openSearchDrawer} className={shadowStyles.locals.globalSecondary}>
              <slot name="global-search" />
            </div>
            <div ref={openCreateDrawer} className={shadowStyles.locals.globalSecondary}>
              <slot name="global-create" />
            </div>
            <div className={shadowStyles.locals.globalBottom}>
              <div className={shadowStyles.locals.globalSecondary}>
                <slot name="global-help" />
              </div>
              <div className={shadowStyles.locals.globalSecondary}>
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
            <div className={shadowStyles.locals.containerName}>
              <a href={elem.containerHref}>
                <img
                  className={shadowStyles.locals.containerLogo}
                  alt={elem.containerName}
                  src={elem.containerLogo}
                />
              </a>
              <span>{elem.containerName}</span>
            </div>
            <div className={shadowStyles.locals.containerLinks}>
              <slot />
            </div>
          </div>
        </div>
      </div>
    );
  },
  props: {
    /** TODO: make these private props somehow **/
    shouldAnimate: prop.boolean(),
    width: prop.number({
      default: collapsedWidth,
      attribute: true, //TODO: remove, this is for debugging
    }),
    open: prop.boolean({
      attribute: true,
      set(elem, data) {
        if (!data.oldValue && data.newValue) {
          emit(elem, 'ak-navigation-open');
        } else if (data.oldValue && !data.newValue) {
          emit(elem, 'ak-navigation-close');
        }
        elem.createDrawerOpen = elem.open && elem.createDrawerOpen;
        elem.searchDrawerOpen = elem.open && elem.searchDrawerOpen;
        elem.width = elem.open ? expandedWidth : collapsedWidth;
      },
      event: 'ak-navigation-open-state-changed',
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
  prototype: {
    toggleHandler(event) {
      if (event.keyCode === keycode('[')) {
        this.open = !this.open;
      }
    },
  },
  attached(elem) {
    setTimeout(() => {
      elem.shouldAnimate = true;
    }, shouldAnimateThreshold);
    document.body.addEventListener('keyup', elem.toggleHandler.bind(elem));
  },
  detached(elem) {
    document.body.removeEventListener('keyup', elem.toggleHandler);
  },
  created(elem) {
    elem.addEventListener('ak-navigation-create-drawer-open', () => {
      elem.createDrawerOpen = true;
    });
    elem.addEventListener('ak-navigation-search-drawer-open', () => {
      elem.searchDrawerOpen = true;
    });
    elem.addEventListener('ak-navigation-link-selected', (event) => {
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
