import React, { PureComponent, PropTypes } from 'react';
import { action } from '@kadira/storybook';
import { AtlassianIcon, SearchIcon, CreateIcon, DashboardIcon, SettingsIcon, ProjectsIcon } from 'ak-icon';
import Navigation, { AkContainerHeader, AkContainerItem } from '../../src/index';
import nucleusLogo from '../nucleus.png';

export default class BasicNavigation extends PureComponent {
  static get propTypes() {
    return {
      children: PropTypes.node,
    };
  }

  static get defaultProps() {
    return {
      children: <div>
        <AkContainerItem
          icon={<DashboardIcon />}
          text="Item A"
        />
        <AkContainerItem
          icon={<SettingsIcon />}
          text="Item B"
        />
        <AkContainerItem
          icon={<ProjectsIcon />}
          text="Item C"
        />
      </div>,
    };
  }

  constructor(...args) {
    super(...args);
    this.state = {
      openDrawer: null,
    };
  }

  activate = name =>
    () => this.setState({
      openDrawer: this.state.openDrawer === name ? null : name,
    });

  render() {
    return (
      <Navigation
        resizeHandler={action('resize')}
        containerHeader={
          <a href="#foo">
            <AkContainerHeader
              text="AtlasCat"
              icon={
                <img alt="nucleus" src={nucleusLogo} />
              }
            />
          </a>
        }
        globalPrimaryIcon={<AtlassianIcon size="medium" />}
        globalSearchIcon={<SearchIcon />}
        globalCreateIcon={<CreateIcon />}
        onSearchDrawerActivated={this.activate('search')}
        onCreateDrawerActivated={this.activate('create')}
        isCreateDrawerOpen={this.state.openDrawer === 'create'}
        isSearchDrawerOpen={this.state.openDrawer === 'search'}
        onBlanketClicked={action('blanket clicked')}
        hasBlanket
        {...this.props}
      >
        {this.props.children}
      </Navigation>
    );
  }
}
