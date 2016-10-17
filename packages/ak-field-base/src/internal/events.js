/**
 * This event gets emitted when a field is about to switch to its `editmode` view.
 * You might choose to use this event to update your editmode content to be in sync with your
 * viewmode, fetch data for your editmode or even cancel the event to prevent the change completely.
 *
 * @event FieldBase#showEditingView
 * @example @js import { events } from 'akutil-field-base';
 *
 * field.addEventListener(events.showEditingView, (e) => {
 *   // perform your tasks here
 * });
 */
export const showEditingView = 'show-editing-view';
/**
 * This event gets emitted when a field is about to switch to it's `viewmode` view.
 * Here you could choose to update your viewmode content to match the users input or reset the value
 * shown in the `editmode` if the user hit cancel for example.
 *
 * You might also choose to perform validation of the users value.
 *
 * You can check if the user clicked the cancel button through the `e.detail.canceled` value.
 *
 * @event FieldBase#showViewingView
 * @example @js import { events } from 'ak-field-base';
 *
 * field.addEventListener(events.showViewingView, (e) => {
 *   if (e.detail.canceled) {
 *     // the user hit cancel
 *   } else {
 *    // the user hit confirm: perform validation, update view mode, etc
 *   }
 * });
 */
export const showViewingView = 'show-viewing-view';
