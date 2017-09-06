import React, { PureComponent } from 'react';
import { ThemeProvider } from 'styled-components';
import { itemThemeNamespace } from '@atlaskit/item';
import createItemTheme from './map-navigation-theme-to-item-theme';
import type { Provided, RootTheme } from '../theme/types';
import { rootKey } from './util';

type Props = {
  provided: Provided,
  isCollapsed?: boolean,
  children?: HTMLElement
};

export default class WithRootTheme extends PureComponent {
  props: Props // eslint-disable-line react/sort-comp

  static defaultProps = {
    isCollapsed: false,
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
      <ThemeProvider theme={outerTheme => this.withOuterTheme(outerTheme)}>
        {this.props.children}
      </ThemeProvider>
    );
  }
}
