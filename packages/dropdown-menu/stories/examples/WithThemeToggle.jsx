import React, { PureComponent } from 'react';
import Button from '@atlaskit/button';
import { AtlasKitThemeProvider } from '@atlaskit/theme';
import DropdownMenu, { DropdownItem, DropdownItemGroup } from '@atlaskit/dropdown-menu';

class WithThemeToggle extends PureComponent {
  state = {
    theme: 'light',
  };
  toggleTheme = () =>
    this.setState(state => ({
      theme: state.theme === 'light' ? 'dark' : 'light',
    })
  );

  render() {
    const ToggleButton = () => (
      <Button appearance="primary" onClick={this.toggleTheme}>
        Toggle theme - {this.state.theme}
      </Button>
    );

    return (
      <AtlasKitThemeProvider mode={this.state.theme}>
        <ToggleButton />
        <DropdownMenu
          trigger={'Menu'}
          triggerType="button"
          shouldFlip={false}
          position="bottom left"
        >
          <DropdownItemGroup>
            <DropdownItem isSelected>Logs</DropdownItem>
            <DropdownItem >Test results</DropdownItem>
          </DropdownItemGroup>
        </DropdownMenu>
      </AtlasKitThemeProvider>
    );
  }
}

export default WithThemeToggle;
