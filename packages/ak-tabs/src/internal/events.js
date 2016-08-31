/**
 * @event Tab#ak-tabs-tab-select
 * @memberof Tab
 * @description Fired when a tab is selected.
 * @property {Tab} detail.tab The tab element.
 */
const TAB_SELECT = 'ak-tabs-tab-select';

/**
 * @event Tab#ak-tabs-tab-deselect
 * @memberof Tab
 * @description Fired when a tab is deselected.
 * @property {Tab} detail.tab The tab element.
 */
const TAB_DESELECT = 'ak-tabs-tab-deselect';

/**
 * @event Tab#ak-tabs-tab-change
 * @memberof Tab
 * @description Fired when a tab has changed.
 * @property {Tab} detail.tab The tab element.
 * @private
 */
const TAB_CHANGE = 'ak-tabs-tab-change';

export { TAB_SELECT, TAB_DESELECT, TAB_CHANGE };
