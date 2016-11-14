/**
 * This event gets emitted when the blanket (semi-transparent background) is clicked. This can be
 * used to update the `open` property of the modal-dialog.
 *
 * It is not fired when the actual modal content area is clicked.
 *
 * @event ModalDialog#blanketClicked
 * @example @html <ak-modal-dialog
 *   onBlanketClicked={(e) => console.log('Background was clicked')}
 * ></ak-tag>
 * @example @js import { events } from 'ak-modal-dialog';
 *
 * modal.addEventListener(events.blanketClicked, (e) => {
 *   console.log('Background was clicked');
 * });
 */
export const blanketClicked = 'blanket-clicked'; // eslint-disable-line import/prefer-default-export
