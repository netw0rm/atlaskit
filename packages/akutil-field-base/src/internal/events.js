export const showEditingView = 'show-editing-view';
export const showViewingView = 'show-viewing-view';
/**
 * This event gets emitted when a field is in editmode and a user clicks the cancel button.
 * Here you would usually reset any temporary values that might be in your edit mode
 * as the user has cancelled the edit.
 *
 * @event FieldBase#cancelEditPressed
 * @example @js import { events } from 'ak-field-base';
 *
 * field.addEventListener(events.cancelEditPressed, (e) => {
 *   field.lightDOMinputField.value = elem.value;
 * });
 */
export const cancelEditPressed = 'cancel-edit-pressed';
/**
 * This event gets emitted when a field is in editmode and a user clicks the confirm button.
 * This is where you would usually either perform validation or reflect any lightDOM input into
 * your component.
 * @event FieldBase#confirmEditPressed
 * @example @js import { events } from 'ak-field-base';
 * @js import { props } from 'skatejs';
 *
 * field.addEventListener(events.confirmEditPressed, (e) => {
 *   props(elem, { value: field.lightDOMinputField.value })
 * });
 */
export const confirmEditPressed = 'confirm-edit-pressed';
