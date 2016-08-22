/** @jsx vdom */
import 'style!./host.less';

import { emit, prop, vdom, define } from 'skatejs';
import shadowStyles from './index.less';
import './ak-navigation-link';
import classNames from 'classnames';
import getSwipeType, { swipeLeft, swipeRight, noSwipe } from './touch';
import keycode from 'keycode';

const shouldAnimateThreshold = 100; // ms

export default define('ak-navigation', {
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
    shouldAnimate: prop.boolean(),
    open: prop.boolean({
      attribute: true,
      set(elem, data) {
        if (!data.oldValue && data.newValue) {
          emit(elem, 'ak-navigation-open');
        } else if (data.oldValue && !data.newValue) {
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
    document.body.addEventListener('keyup', (event) => {
      if (keycode(event) === '[') {
        elem.open = !elem.open;
      }
    });
  },
});
