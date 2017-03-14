import React, { PureComponent } from 'react';
import { AtlassianIcon, ArrowleftIcon, IssuesIcon, QuestionCircleIcon } from '@atlaskit/icon';
import AkButton from '@atlaskit/button';
import { AkSearchDrawer, AkCreateDrawer, AkCustomDrawer, AkContainerItem, AkGlobalItem } from '../../src/index';
import BasicNavigation from './BasicNavigation';

export default class DrawerWidthNavigation extends PureComponent {
  constructor(...args) {
    super(...args);
    this.state = {
      openDrawer: null,
      isCreateDrawerFullWidth: false,
      isSearchDrawerFullWidth: false,
      customDrawerWidth: 'narrow',
    };
  }

  getBackIcon = () => (
    <ArrowleftIcon label="Back icon" size="medium" />
  );

  getPrimaryIcon = () => (
    <AtlassianIcon label="Atlassian icon" size="medium" />
  );

  getSearchDrawer = () => (
    <AkSearchDrawer
      backIcon={this.getBackIcon()}
      isOpen={this.state.openDrawer === 'search'}
      isFullWidth={this.state.isSearchDrawerFullWidth}
      key="search"
      onBackButton={() => this.setDrawer(null)}
      primaryIcon={this.getPrimaryIcon()}
    >
      <p>Search drawer</p>
      <AkButton onClick={this.toggleSearchDrawerWidth}>
        Change drawer width
      </AkButton>
    </AkSearchDrawer>
  );

  getCreateDrawer = () => (
    <AkCreateDrawer
      backIcon={this.getBackIcon()}
      isOpen={this.state.openDrawer === 'create'}
      isFullWidth={this.state.isCreateDrawerFullWidth}
      key="create"
      onBackButton={() => this.setDrawer(null)}
      primaryIcon={this.getPrimaryIcon()}
    >
      <p>Create drawer</p>
      <AkButton onClick={this.toggleCreateDrawerWidth}>
        Change drawer width
      </AkButton>
    </AkCreateDrawer>
  );

  getCustomDrawer = () => (
    <AkCustomDrawer
      backIcon={this.getBackIcon()}
      isOpen={this.state.openDrawer === 'custom'}
      width={this.state.customDrawerWidth}
      key="custom"
      onBackButton={() => this.setDrawer(null)}
      primaryIcon={this.getPrimaryIcon()}
    >
      <p>Create drawer</p>
      <AkButton onClick={this.changeCustomDrawerWidth}>
        Change drawer width
      </AkButton>
    </AkCustomDrawer>
  );

  setDrawer = (drawerId) => {
    this.setState({
      openDrawer: drawerId,
    });
  }

  changeCustomDrawerWidth = () => {
    let nextWidth;
    if (this.state.customDrawerWidth === 'narrow') {
      nextWidth = 'wide';
    } else if (this.state.customDrawerWidth === 'wide') {
      nextWidth = 'full';
    } else {
      nextWidth = 'narrow';
    }

    this.setState({
      customDrawerWidth: nextWidth,
    });
  };

  toggleSearchDrawerWidth = () => {
    this.setState({
      isSearchDrawerFullWidth: !this.state.isSearchDrawerFullWidth,
    });
  };

  toggleCreateDrawerWidth = () => {
    this.setState({
      isCreateDrawerFullWidth: !this.state.isCreateDrawerFullWidth,
    });
  };

  render() {
    return (
      <BasicNavigation
        drawers={[
          this.getSearchDrawer(),
          this.getCreateDrawer(),
          this.getCustomDrawer(),
        ]}
        isOpen={this.state.isOpen}
        onCreateDrawerOpen={() => this.setDrawer('create')}
        onSearchDrawerOpen={() => this.setDrawer('search')}
        globalHelpItem={
          <AkGlobalItem>
            <QuestionCircleIcon label="Help icon" />
          </AkGlobalItem>
        }
      >
        <div>
          <AkContainerItem
            icon={<IssuesIcon label="Custom" />}
            text="Open custom drawer"
            onClick={() => this.setDrawer('custom')}
          />
        </div>
      </BasicNavigation>
    );
  }
}
