import { vdom, define, prop, emit } from 'skatejs';
import AkBlanket from 'ak-blanket';
import shadowStyles from './shadow.less';
import * as events from './internal/events';

/**
 * @description A modal dialog which blankets the page
 * @class ModalDialog
 * @example @js import ModalDialog from 'ak-modal-dialog';
 * const component = new ModalDialog();
 * @example @html @playground <ak-modal-dialog>
 *   <div slot="header">
 *     My modal header
 *   </div>
 *   <form>
 *     My form content
 *   </form>
 *   <div slot="footer">
 *     <ak-button appearance="primary">Create issue</ak-button>
 *   </div>
 * </ak-modal-dialog>
 */
export default define('ak-modal-dialog', {
  /**
   * @description Whether the modal dialog is open/visible
   * @memberof ModalDialog
   * @instance
   * @type {Boolean}
   * @default false
   * @example @html <ak-modal-dialog open></ak-modal-dialog>
   */
  props: {
    open: prop.boolean({
      attribute: true,
    }),
  },
  attached(elem) {
    elem.addEventListener('click', (e) => {
      const isButton = e.target.hasAttribute('appearance') || e.target.tagName.toLowerCase() === 'button';
      if (elem.formSlot && isButton) {
        const formSlotAssigned = elem.formSlot.assignedNodes();
        if (formSlotAssigned && formSlotAssigned.length) {
          formSlotAssigned[0].submit();
        }
      }
    });
  },
  render(elem) {
    // only render if open
    if (!elem.open) return () => null;

    return (
      <div className={shadowStyles.locals.positioner}>
        <style>{shadowStyles.toString()}</style>
        <AkBlanket
          tinted
          open
          onClick={(e) => {
            e.preventDefault();
            emit(elem, events.willClose);
          }}
        />
        <div className={shadowStyles.locals.area}>
          <div className={shadowStyles.locals.headerFlex}>
            <div className={shadowStyles.locals.headerSlot}>
              <slot name="header" />
            </div>
          </div>
          <div className={shadowStyles.locals.contentFlex}>
            <div className={shadowStyles.locals.contentSlot}>
              <slot ref={(formSlot) => { elem.formSlot = formSlot; }} />
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
});

export { events };
