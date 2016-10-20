import { prop, props, vdom, define } from 'skatejs';
import classNames from 'classnames';
import { events as navigationEvents } from 'jonelson-tmp-navigation';

import shadowStyles from './shadow.less';


const {
  resizeStart: resizeStartEvent,
  resizeEnd: resizeEndEvent,
} = navigationEvents;

const shouldAnimateThreshold = 100; // ms

function handleResizeStart(e, elem) {
  props(elem, {
    __isResizing: true,
  });
}

function handleResizeEnd(e, elem) {
  props(elem, {
    __isResizing: false,
  });
}

/**
 * @description Create instances of the component programmatically, or using markup.
 * @class Page
 * @example @html <ak-page/>
 * @example @js import Page from 'ak-page';
 *
 * const page = new Page();
 * document.body.appendChild(page);
 */
export default define('ak-page', {
  render(elem) {
    return (
      <div
        className={classNames(shadowStyles.locals.page, {
          // eslint-disable-next-line no-underscore-dangle
          [shadowStyles.locals.resizing]: elem.__isResizing,
        })}
      >
        <style>{shadowStyles.toString()}</style>
        <div className={shadowStyles.locals.navigation}>
          <slot
            className={shadowStyles.locals.navigationSlot}
            name="navigation"
          />
        </div>
        <div className={classNames(shadowStyles.locals.mainOuter)}>
          <div
            className={classNames(shadowStyles.locals.mainInner, {
              [shadowStyles.locals.fluid]: (elem.layout === 'fluid'),
            })}
          >
            <slot className={shadowStyles.locals.mainSlot} />
          </div>
        </div>
      </div>
    );
  },
  props: {
    __isResizing: prop.boolean(),
    /**
     * @description Whether the component should display animations.
     * `shouldAnimate` is turned on after page load.
     * @memberof Page
     * @instance
     * @type {boolean}
     * @example @js page.shouldAnimate = true;
     */
    shouldAnimate: prop.boolean(),
    /**
     * @description Defines the size of the page.
     * Allowed values: 'fixed', 'fluid'.
     * @memberof Page
     * @instance
     * @default fixed
     * @type {string}
     * @example @html <ak-page layout="fluid"></ak-page>
     * @example @js page.layout = 'fluid';
     */
    layout: prop.string({
      attribute: true,
      default: 'fixed',
    }),
  },
  created(elem) {
    elem.addEventListener(resizeStartEvent, e => handleResizeStart(e, elem));
    elem.addEventListener(resizeEndEvent, e => handleResizeEnd(e, elem));
  },
  attached(elem) {
    setTimeout(() => {
      elem.shouldAnimate = true;
    }, shouldAnimateThreshold);
  },
});
