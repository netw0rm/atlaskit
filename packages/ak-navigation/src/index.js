/** @jsx vdom */
import 'style!./host.less'; // eslint-disable-line import/no-unresolved

import { emit, prop, vdom, define } from 'skatejs';
import shadowStyles from './ak-navigation.less';
import './ak-navigation-link';

const definition = {
  render(elem) {
    return (
      <div
        className={[
          shadowStyles.locals.navigation,
          elem.open ? shadowStyles.locals.open : '',
          elem.shouldAnimate ? shadowStyles.locals.shouldAnimate : '',
        ].join(' ')}
      >
        <style>{shadowStyles.toString()}</style>
        <div className={shadowStyles.locals.global}>
          Global
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
      default: true,
      set(elem, data) {
        const oldValue = data.oldValue === null ? true : data.oldValue;
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
  ready(elem) {
    setTimeout(() => {
      elem.shouldAnimate = true;
    }, 100);
  },
  events: {
    'ak-navigation-open-state-changed': (elem, event) => {
      // We want to make the event bubble TODO incorporate this as an option for skate
      // https://github.com/skatejs/skatejs/issues/683
      if (event.detail.openState !== undefined) {
        return; // we don't want to loop indefinitely
      }
      emit(elem, 'ak-navigation-open-state-changed', {
        detail: { openState: event.detail.newValue },
      });
    },
    'ak-navigation-link-selected': (elem, event) => {
      const containerLinks = Array.prototype.slice.call(elem.children);
      containerLinks.forEach((child) => { child.selected = false; });
      event.target.selected = true;
    },
  },
};

export default define('ak-navigation', definition);
