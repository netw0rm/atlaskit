/**
 * @event Tab#tab-change
 * @memberof Tab
 * @description Fired when a tab is initialised or a property has changed.
 * @example @js import { events } from 'ak-tabs';
 * const { tabChange: tabChangeEvent } = events;
 * myTab.addEventListener(tabChangeEvent, (e) => {
 *   console.log(`The {e.target.label} tab was changed.`);
 * });
 */
// eslint-disable-next-line import/prefer-default-export
export const tabChange = 'tabChange';
