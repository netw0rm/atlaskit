/**
 * This event gets emitted before a field-base changes it's own `focused` prop.
 * (e.g. when a child element receives focus, field-base will set it's own focused prop).
 *
 *  It is cancelable. If it gets cancelled, the change is aborted.
 *
 * It will not get called if the prop change came from somewhere else.
 *
 * @event FieldBase#beforeFocusedChange
 * @example @html <ak-field-base
 *   onBeforeFocusedChange={(e) => console.log('Just about to start the remove animation')}
 * ></ak-tag>
 * @example @js import { events } from 'ak-field-base';
 *
 * field.addEventListener(events.beforeFocusedChange, (e) => {
 *   console.log('Just about to apply focused=' + e.detail.focused);
 *   // e.preventDefault(); // this would stop change
 * });
 */
export const beforeFocusedChange = 'beforeFocusedChange'; // eslint-disable-line import/prefer-default-export, max-len
