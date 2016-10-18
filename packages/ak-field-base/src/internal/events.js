/**
 * This event gets emitted when a field is about to switch away from it's `viewmode` view.
 *
 * You might choose to use this event to update your editmode content to be in sync with your
 * viewmode, fetch data for your editmode or even cancel the event to prevent the change completely.
 *
 * @event FieldBase#exitViewingView
 * @example @js import { events } from 'ak-field-base';
 *
 * field.addEventListener(events.exitViewingView, (e) => {
 *   // perform your tasks here
 *   // e.preventDefault(); will prevent the switch
 * });
 */
export const exitViewingView = 'exit-viewing-view';
/**
 * This event gets emitted when a field is about to switch away from it's `editmode` view.
 *
 * Here you could choose to update your viewmode content to match the users input or reset the value
 * shown in the `editmode` if the user hit cancel for example.
 *
 * You might also choose to perform validation of the users value, this might involve cancelling
 * the event to prevent the switch.
 *
 * You can check if the user clicked the cancel button through the `e.detail.cancelButtonPressed`
 * value.
 *
 * @event FieldBase#exitEditingView
 * @example @js import { events } from 'ak-field-base';
 *
 * field.addEventListener(events.exitEditingView, (e) => {
 *   if (e.detail.cancelButtonPressed) {
 *     // the user hit cancel
 *   } else {
 *    // the user hit confirm: perform validation, update view mode, etc
 *    // e.preventDefault(); will cancel the switch and keep us in editmode
 *   }
 * });
 */
export const exitEditingView = 'exit-editing-view';
