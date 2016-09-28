/**
 * This event gets emitted before a link is selected
 * @event NavigationLink#linkSelected
 * @example @html <ak-navigation
 *   onLinkSelected={(e) => console.log('A link has been selected')}
 * ></ak-tag>
 * @example @js import { events } from 'ak-navigation';
 *
 * navigation.addEventListener(events.linkSelected, (e) => {
 *   console.log('A link has been selected');
 * });
 */
export const linkSelected = 'linkSelected';

/**
 * This event gets emitted before a create drawer is selected (either opening or closing it)
 * @event NavigationLink#createDrawerSelected
 * @example @html <ak-navigation
 *   onCreateDrawerSelected={(e) => console.log('Create drawer has been selected')}
 * ></ak-tag>
 * @example @js import { events } from 'ak-navigation';
 *
 * navigation.addEventListener(events.createDrawerSelected, (e) => {
 *   console.log('Create drawer has been selected');
 * });
 */
export const createDrawerSelected = 'createDrawerSelected';

/**
 * This event gets emitted before a search drawer is selected (either opening or closing it)
 * @event NavigationLink#searchDrawerSelected
 * @example @html <ak-navigation
 *   onSearchDrawerSelected={(e) => console.log('Search drawer has been selected')}
 * ></ak-tag>
 * @example @js import { events } from 'ak-navigation';
 *
 * navigation.addEventListener(events.searchDrawerSelected, (e) => {
 *   console.log('Search drawer has been selected');
 * });
 */
export const searchDrawerSelected = 'searchDrawerSelected';

/**
 * This event gets emitted before the `navigation.open` is set to `true`.
 * @event NavigationLink#open
 * @example @html <ak-navigation
 *   onOpen={(e) => console.log('Navigation has opened')}
 * ></ak-tag>
 * @example @js import { events } from 'ak-navigation';
 *
 * navigation.addEventListener(events.open, (e) => {
 *   console.log('Navigation has opened');
 * });
 */
export const open = 'open';

/**
 * This event gets emitted before the `navigation.open` is set to `false`.
 * @event NavigationLink#close
 * @example @html <ak-navigation
 *   onClose={(e) => console.log('Navigation has closed')}
 * ></ak-tag>
 * @example @js import { events } from 'ak-navigation';
 *
 * navigation.addEventListener(events.close, (e) => {
 *   console.log('Navigation has closed');
 * });
 */
export const close = 'close';

/**
 * This event gets emitted after the width of the navigation changes.
 * Note that this will also be emitted one time at the start,
 * with `e.detail.oldWidth` set to `null`.
 * @event NavigationLink#widthChanged
 * @example @html <ak-navigation
 *   onWidthChanged={(e) => console.log(`Navigation width changed.
 *      Old width was ${e.detail.oldWidth}, new width is ${e.detail.newWidth},
 *      which matches ${elem.width}`)}
 * ></ak-tag>
 * @example @js import { events } from 'ak-navigation';
 *
 * navigation.addEventListener(events.widthChanged, (e) => {
 *   console.log(`Navigation width changed.
 *      Old width was ${e.detail.oldWidth}, new width is ${e.detail.newWidth},
 *      which matches ${elem.width}`)
 * });
 */
export const widthChanged = 'widthChanged';

/**
 * This event gets emitted before a link is selected
 * @event NavigationLink#openStateChanged
 * @example @html <ak-navigation
 *   onOpenStateChanged={(e) => console.log('Open state has changed')}
 * ></ak-tag>
 * @example @js import { events } from 'ak-navigation';
 *
 * navigation.addEventListener(events.openStateChanged, (e) => {
 *   console.log('Open state has changed');
 * });
 */
export const openStateChanged = 'openStateChanged';
