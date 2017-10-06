import { gridSize } from '../../../shared-variables';

const prefix = name => `__ak_nav_collapsed_overflow_${name}`;
export const shouldReportItemHeight = prefix('shouldReportItemHeight');
export const reportItemHeightToGroup = prefix('reportItemHeight');

export const overflowManagerNamespace = prefix('manager_ns');
export const overflowGroupNamespace = prefix('group_ns');

export const dropdownHeight = gridSize * 5;
export const reservedGapHeight = gridSize * 4;
