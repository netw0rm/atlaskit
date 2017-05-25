// @flow
import React, { PureComponent } from 'react';
import { ThemeProvider } from 'styled-components';
import type { Theme } from '../theme/types';

type Map = {|
  [key: string]: mixed
|}

export const prefix = (key: string): string => `@atlaskit-private-theme-do-not-use/navigation:${key}`;

export const getProvided = (map: Map): Theme => {
  const result: Theme = (map[prefix('provided')] : any);
  return result;
};

export const getIsCollapsed = (map: Map): bool => {
  const result: bool = (map[prefix('isCollapsed')] : any);
  return result;
};

export const populateTheme = (provided: Theme, isCollapsed?: boolean = false): mixed => ({
  [prefix('provided')]: provided,
  [prefix('isCollapsed')]: isCollapsed,
});

type Props = {|
  provided: Theme,
  isCollapsed?: bool,
  children: mixed,
|}

export class WithTheme extends PureComponent {
  props: Props

  withOuterTheme = (outerTheme = {}) => {
    const { provided, isCollapsed } = this.props;
    const newValues = populateTheme(provided, isCollapsed);

    // This will preserve any existing theme values.
    // This will override any values that have the same keys.
    return {
      ...outerTheme,
      ...newValues,
    };
  }

  render() {
    // Would like to use theme={this.withOuterTheme} but styled-components is not
    // handling updates correctly
    return (
      <ThemeProvider
        theme={outerTheme => this.withOuterTheme(outerTheme)}
      >
        {this.props.children}
      </ThemeProvider>
    );
  }
}

