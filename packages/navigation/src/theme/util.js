// @flow
import { css } from 'styled-components';
import hasOwnProperty from '../utils/has-own-property';
import type { Provided } from '../theme/types';
import { container } from './presets';

export const prefix = (key: string): string => `@atlaskit-private-theme-do-not-use/navigation:${key}`;
export const rootKey = prefix('root');
export const groupKey = prefix('group');
export const isDropdownOverflowKey = prefix('isDropdownOverflow');
export const isElectronMacKey = prefix('isElectronMac');

export const isElectronMac = (map?: Object): boolean =>
  map !== undefined && hasOwnProperty(map, isElectronMacKey) && map[isElectronMacKey];

export const getProvided = (map?: Object): Provided => {
  if (map !== undefined && hasOwnProperty(map, rootKey)) {
    return map[rootKey].provided;
  }
  return container;
};
export const isCollapsed = (map: Object): bool => map[rootKey].isCollapsed;

export const isInOverflowDropdown = (map: Object): bool => (
  hasOwnProperty(map, isDropdownOverflowKey)
);

export const isInCompactGroup = (map: Object): bool => {
  if (!hasOwnProperty(map, groupKey)) {
    return false;
  }
  return map[groupKey].isCompact;
};

export const whenCollapsed = (...args: Array<any>) => css`
  ${({ theme }) => (isCollapsed(theme) ? css(...args) : '')}
`;

export const whenNotCollapsed = (...args: Array<any>) => css`
  ${({ theme }) => (!isCollapsed(theme) ? css(...args) : '')}
`;

export const whenNotInOverflowDropdown = (...args: Array<any>) => css`
  ${({ theme }) => (!isInOverflowDropdown(theme) ? css(...args) : '')}
`;

export const whenCollapsedAndNotInOverflowDropdown = (...args: Array<any>) => css`
  ${({ theme }) => (isCollapsed(theme) && !isInOverflowDropdown(theme) ? css(...args) : '')}
`;

export { default as WithRootTheme } from './with-root-theme';
