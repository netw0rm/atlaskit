import 'style!./host.less';
import { prop, vdom, define } from 'skatejs';
import shadowStyles from './shadow.less';
import classNames from 'classnames';
import Navigation, { events as navigationEvents } from 'ak-navigation';
const {
  widthChanged: widthChangedEvent,
} = navigationEvents;

const navigationPadding = 20;
const shouldAnimateThreshold = 100; // ms

function handleWidthChanged(e, elem) {
  if (e.target instanceof Navigation) {
    elem.navigationWidth = e.detail.newWidth;
  }
}

const navigationSlot = Symbol('navigationSlot');

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
      <div>
        {/* This is required for elements in the shadow root to be styled.
           This is wrapped in the <div /> because you can't have more than one
           root element.
        */}
        <style>{shadowStyles.toString()}</style>
        <style>{`
            .${shadowStyles.locals.main} {
              margin-left: ${elem.navigationWidth + navigationPadding}px;
            }
          `}</style>
        <div className={shadowStyles.locals.navigation}>
          <slot
            ref={(el) => { elem[navigationSlot] = el; }}
            className={shadowStyles.locals.navigationSlot}
            name="navigation"
          />
        </div>
        <div
          className={classNames(shadowStyles.locals.main, {
            [shadowStyles.locals.shouldAnimate]: elem.shouldAnimate,
          })}
        >
          <div className={shadowStyles.locals.mainFixed}>
            <slot className={shadowStyles.locals.mainSlot} />
          </div>
        </div>
      </div>
    );
  },
  props: {
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
     * @description The current width of the navigation part of the page.
     * This is updated by Page when it listens to a Navigation#widthChanged event.
     * @memberof Page
     * @instance
     * @type {integer}
     * @example @js navigation.navigationWidth = 80;
     * @example @html <ak-page navigation-width="80" />;
     */
    navigationWidth: prop.number({
      attribute: true,
    }),
  },
  created(elem) {
    elem.addEventListener(widthChangedEvent, (e) => handleWidthChanged(e, elem));
  },
  attached(elem) {
    setTimeout(() => {
      elem.shouldAnimate = true;
    }, shouldAnimateThreshold);
    const navigation = elem[navigationSlot].assignedNodes()[0];
    if (!navigation) {
      return;
    }
    elem.navigationWidth = navigation.width;
  },
});
