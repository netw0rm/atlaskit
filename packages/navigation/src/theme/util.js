// @flow
import React, { PureComponent } from 'react';
import { css, ThemeProvider } from 'styled-components';
import { itemThemeNamespace } from '@atlaskit/item';
import hasOwnProperty from '../utils/has-own-property';
import type { Provided, RootTheme } from '../theme/types';
import { container } from './presets';
import createItemTheme from './create-item-theme';

export const prefix = (key: string): string => `@atlaskit-private-theme-do-not-use/navigation:${key}`;
const rootKey = prefix('root');
const groupKey = prefix('group');
export const isDropdownOverflowKey = prefix('isDropdownOverflow');

export const getProvided = (map?: Object): Provided => {
  if (map !== undefined && hasOwnProperty(map, rootKey)) {
    return map[rootKey].provided;
  }
  return container;
};
export const isCollapsed = (map: Object): bool => map[rootKey].isCollapsed;
export const isInOverflowDropdown = (map: Object): bool =>
  hasOwnProperty(map, isDropdownOverflowKey);

export const isInCompactGroup = (map: Object): bool => {
  if (!hasOwnProperty(map, groupKey)) {
    return false;
  }
  return map[groupKey].isCompact;
};

export const whenCollapsed = (...args: Array<any>) => css`
  ${({ theme }) => (isCollapsed(theme) ? css(...args) : '')}
`;

export const whenNotInOverflowDropdown = (...args: Array<any>) => css`
${({ theme }) => (!isInOverflowDropdown(theme) ? css(...args) : '')}
`;

export const whenCollapsedAndNotInOverflowDropdown = (...args: Array<any>) => css`
  ${({ theme }) => (isCollapsed(theme) && !isInOverflowDropdown(theme) ? css(...args) : '')}
`;

export class WithRootTheme extends PureComponent {
  static defaultProps = {
    isCollapsed: false,
  }

  props: {
    provided: Provided,
    isCollapsed?: boolean,
    children?: any
  }

  withOuterTheme = (outerTheme: ?Object = {}): Object => {
    const theme: RootTheme = {
      provided: this.props.provided,
      isCollapsed: (this.props.isCollapsed || false),
    };

    return {
      ...outerTheme,
      [rootKey]: theme,
      [itemThemeNamespace]: createItemTheme(this.props.provided, this.props.isCollapsed),
    };
  }

  render() {
    return (
      <ThemeProvider
        theme={outerTheme => this.withOuterTheme(outerTheme)}
      >
        {this.props.children}
      </ThemeProvider>
    );
  }
}
