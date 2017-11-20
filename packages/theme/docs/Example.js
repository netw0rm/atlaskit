import React, { Component } from 'react';
import { AtlasKitThemeProvider } from '@atlaskit/theme';

class AtlasKitThemeProviderExample extends Component {
  state = { mode: 'light' }
  onButtonClick = () => this.setState({
    mode: this.state.mode === 'light' ? 'dark' : 'light',
  })
  render() {
    return (
      <div>
        <AtlasKitThemeProvider mode={'light'}>
          <div style={{ padding: '6px', textAlign: 'center' }}>
            This div is wrapped to be in light mode.
          </div>
        </AtlasKitThemeProvider>
        <AtlasKitThemeProvider mode={'dark'}>
          <div style={{ padding: '6px', textAlign: 'center' }}>
            This div is wrapped to be in dark mode.
          </div>
        </AtlasKitThemeProvider>
      </div>
    );
  }
}

export default AtlasKitThemeProviderExample;
