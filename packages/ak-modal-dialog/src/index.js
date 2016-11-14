import { vdom, define, prop, emit } from 'skatejs';
import AkBlanket from 'ak-blanket';
import shadowStyles from './shadow.less';
import * as events from './internal/events';

function triggerSubmit(elem, targetFormId) {
  if (elem.formSlot) {
    const formSlotAssigned = elem.formSlot.assignedNodes();
    if (formSlotAssigned && formSlotAssigned.length) {
      const formEl = formSlotAssigned[0];
      if (formEl.id === targetFormId) {
        formEl.submit();
      }
    }
  }
}

/**
 * @description A modal dialog which blankets the page
 * @class ModalDialog
 * @example @js import ModalDialog from 'ak-modal-dialog';
 * const component = new ModalDialog();
 * @example @html @playground <ak-modal-dialog>
 *   <div slot="header">
 *     My modal header
 *   </div>
 *   <form id="my-form">
 *     My form content
 *   </form>
 *   <div slot="footer">
 *     <ak-button appearance="primary" form="my-form">Create issue</ak-button>
 *   </div>
 * </ak-modal-dialog>
 */
export default define('ak-modal-dialog', {
  props: {
    /**
    * @description Whether the modal dialog is open/visible
    * @memberof ModalDialog
    * @instance
    * @type {Boolean}
    * @default false
    * @example @html <ak-modal-dialog open></ak-modal-dialog>
    */
    open: prop.boolean({
      attribute: true,
    }),
  },
  attached(elem) {
    // AK-841: need to manually trigger submit until ak-button triggers native submit via form="..."
    elem.addEventListener('click', (e) => {
      const targetFormId = e.target.getAttribute && e.target.getAttribute('form');
      if (targetFormId) {
        triggerSubmit(elem, targetFormId);
      }
    });
  },
  render(elem) {
    // don't render anything if open = false
    if (!elem.open) return () => null;

    return (
      <div className={shadowStyles.locals.blanketPositioner}>
        <style>{shadowStyles.toString()}</style>
        <AkBlanket
          tinted
          open
          onClick={(e) => {
            e.preventDefault();
            emit(elem, events.blanketClicked);
          }}
        />
        <div className={shadowStyles.locals.modalPositioner}>
          <div className={shadowStyles.locals.headerFlex}>
            <slot name="header" />
          </div>
          <div className={shadowStyles.locals.contentFlex}>
            <slot ref={(formSlot) => { elem.formSlot = formSlot; }} />
          </div>
          <div className={shadowStyles.locals.footerFlex}>
            <slot name="footer" />
          </div>
        </div>
      </div>
    );
  },
});

export { events };
