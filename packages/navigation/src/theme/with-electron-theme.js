import React, { PureComponent } from 'react';
import { ThemeProvider } from 'styled-components';
import { isElectronMacKey } from './util';
import type { ReactElement } from '../../src/types';

type Props = {
  isElectronMac?: boolean,
  children?: ReactElement
};

export default class WithElectronTheme extends PureComponent {
  props: Props // eslint-disable-line react/sort-comp

  static defaultProps = {
    isElectronMac: false,
  }

  render() {
    return (
      <ThemeProvider theme={{ [isElectronMacKey]: this.props.isElectronMac }}>
        {this.props.children}
      </ThemeProvider>
    );
  }
}
