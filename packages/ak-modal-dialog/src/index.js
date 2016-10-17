import classNames from 'classnames';
import { emit, vdom, define, prop } from 'skatejs';
import shadowStyles from './shadow.less';
import * as events from './internal/events';
const { announceName: announceNameEvent, announceClick } = events;
import AkBlanket from 'ak-blanket';

/**
 * @description Create instances of the component programmatically, or using markup.
 * @class ModalDialog
 * @example @js import ModalDialog from 'ak-modal-dialog';
 * const component = new ModalDialog();
 */
export default define('ak-modal-dialog', {
  render(elem) {
    // only render the blanket if open
    const Blanket = elem.open ? <AkBlanket tinted open /> : () => {};

    return (
      <div className={shadowStyles.locals.positioner}>
        <style>{shadowStyles.toString()}</style>
        <Blanket />
        <div className={shadowStyles.locals.area}>
          <div className={shadowStyles.locals.headerFlex}>
            <div className={shadowStyles.locals.headerSlot}>
              <slot name="header" />
            </div>
          </div>
          <div className={shadowStyles.locals.contentFlex}>
            <div className={shadowStyles.locals.contentSlot}>
              <slot />
            </div>
          </div>
          <div className={shadowStyles.locals.footerFlex}>
            <div className={shadowStyles.locals.footerSlot}>
              <slot name="footer" />
            </div>
          </div>
        </div>
      </div>
    );
  },
  props: {
    open: prop.boolean({
      attribute: true,
    }),
  },
});

export { events };
