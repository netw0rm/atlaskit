/** @jsx vdom */
import 'style!./host.less'; // eslint-disable-line import/no-unresolved

import { emit, prop, vdom, define } from 'skatejs';
import shadowStyles from './index.less';
import './ak-navigation-link';
import classNames from 'classnames';
import getSwipeType, { swipeLeft, swipeRight, noSwipe } from './touch';

const sidebarOpenByDefault = true;
const shouldAnimateThreshold = 100; // ms

const definition = {
  render(elem) {
    return (
      <div
        className={classNames(shadowStyles.locals.navigation, {
          [shadowStyles.locals.open]: elem.open,
          [shadowStyles.locals.shouldAnimate]: elem.shouldAnimate,
        })}
      >
        <style>{shadowStyles.toString()}</style>
        <div className={shadowStyles.locals.global}>
          <div className={shadowStyles.locals.globalPrimary}>
            <slot name="global-home" />
          </div>
          <div className={shadowStyles.locals.globalSecondary}>
            <slot name="global-search" />
          </div>
          <div className={shadowStyles.locals.globalSecondary}>
            <slot name="global-create" />
          </div>
        </div>
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
    );
  },
  props: {
    shouldAnimate: prop.boolean({ default: false }),
    open: prop.boolean({
      attribute: true,
      default: sidebarOpenByDefault,
      set(elem, data) {
        const oldValue = data.oldValue === null ? sidebarOpenByDefault : data.oldValue;
        if (!oldValue && data.newValue) {
          emit(elem, 'ak-navigation-open');
        } else if (oldValue && !data.newValue) {
          emit(elem, 'ak-navigation-close');
        }
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
  },
  attached(elem) {
    setTimeout(() => {
      elem.shouldAnimate = true;
    }, shouldAnimateThreshold);
  },
  created(elem) {
    elem.addEventListener('ak-navigation-open-state-changed', (event) => {
      // We want to make the event bubble TODO incorporate this as an option for skate
      // https://github.com/skatejs/skatejs/issues/683
      if (event.detail.openState !== undefined) {
        return; // we don't want to loop indefinitely
      }
      emit(elem, 'ak-navigation-open-state-changed', {
        detail: { openState: event.detail.newValue },
      });
    });
    elem.addEventListener('ak-navigation-link-selected', (event) => {
      const containerLinks = Array.prototype.slice.call(elem.children);
      containerLinks.forEach((child) => { child.selected = false; });
      event.target.selected = true;
    });
    elem.addEventListener('ak-navigation-open-state-changed', (event) => {
      elem.touchstart = event;
    });
    elem.addEventListener('touchstart', (event) => {
      // We want to make the event bubble TODO incorporate this as an option for skate
      // https://github.com/skatejs/skatejs/issues/683
      if (event.detail.openState !== undefined) {
        return; // we don't want to loop indefinitely
      }
      emit(elem, 'ak-navigation-open-state-changed', {
        detail: { openState: event.detail.newValue },
      });
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
};

export default define('ak-navigation', definition);
