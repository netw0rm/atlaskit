/**
 * @event TextField#akFocus
 * @memberof Tab
 * @description Fired when a text field gains focus.
 * @example @js import { events } from 'ak-text-field';
 * const { focus } = events;
 * myTextField.addEventListener(focus, (e) => {
 *   // Your code here
 * });
 */
const focus = 'akFocus';

/**
 * @event TextField#akBlur
 * @memberof Tab
 * @description Fired when a tab loses focus.
 * @example @js import { events } from 'ak-text-field';
 * const { blur } = events;
 * myTextField.addEventListener(blur, (e) => {
 *   // Your code here
 * });
 */
const blur = 'akBlur';

export { focus, blur };
