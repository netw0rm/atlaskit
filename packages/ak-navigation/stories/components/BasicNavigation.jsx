import React, { PureComponent, PropTypes } from 'react';
import { action } from '@kadira/storybook';
import { AtlassianIcon, SearchIcon, HelpIcon, CreateIcon, DashboardIcon, SettingsIcon, ProjectsIcon } from 'ak-icon';
import AkDropdownMenu from 'ak-dropdown-menu';
import AkAvatar from 'ak-avatar';
import Navigation, { AkContainerHeader, AkContainerItem, AkGlobalItem } from '../../src/index';
import nucleusLogo from '../nucleus.png';
import emmaAvatar from '../emma.png';

export default class BasicNavigation extends PureComponent {
  static propTypes = {
    children: PropTypes.node,
    isOpen: PropTypes.bool,
    width: PropTypes.number,
    containerHeader: PropTypes.node,
  }

  static defaultProps = {
    children: (<div>
      <AkContainerItem
        icon={<DashboardIcon label="Dashboard" />}
        text="Item A"
      />
      <AkContainerItem
        icon={<SettingsIcon label="Settings" />}
        text="Item B"
      />
      <AkContainerItem
        icon={<ProjectsIcon label="Projects" />}
        text="Item C"
      />
    </div>),
    containerHeader: (<a href="#foo">
      <AkContainerHeader
        text="AtlasCat"
        icon={
          <img alt="nucleus" src={nucleusLogo} />
        }
      />
    </a>),
  }

  constructor(...args) {
    super(...args);
    this.state = {
      openDrawer: null,
      isOpen: this.props.isOpen,
      width: this.props.width,
    };
  }

  activate = name =>
    () => this.setState({
      openDrawer: this.state.openDrawer === name ? null : name,
    });

  resize = (resizeState) => {
    this.setState({
      isOpen: resizeState.isOpen,
      width: resizeState.width,
    });
  }

  render() {
    return (
      <Navigation
        resizeHandler={action('resize')}
        containerHeader={this.props.containerHeader}
        globalSearchIcon={<SearchIcon label="Search icon" />}
        globalCreateIcon={<CreateIcon label="Create icon" />}
        globalPrimaryItem={
          <AkGlobalItem size="large">
            <AtlassianIcon label="Atlassian icon" size="medium" />
          </AkGlobalItem>
        }
        globalHelpItem={
          <AkDropdownMenu
            position="right bottom"
            appearance="tall"
            items={[
              {
                heading: 'Help',
                items: [
                  { content: 'Documentation' },
                  { content: 'Learn Git' },
                  { content: 'Keyboard shortcuts' },
                  { content: 'Bitbucket tutorials' },
                  { content: 'API' },
                  { content: 'Support' },
                ],
              },
              {
                heading: 'Information',
                items: [
                  { content: 'Latest features' },
                  { content: 'Blog' },
                  { content: 'Plans & pricing' },
                  { content: 'Site status' },
                  { content: 'Version info' },
                ],
              },
              {
                heading: 'Legal',
                items: [
                  { content: 'Terms of service' },
                  { content: 'Privacy policy' },
                ],
              },
            ]}
          >
            <AkGlobalItem>
              <HelpIcon label="Help icon" />
            </AkGlobalItem>
          </AkDropdownMenu>
        }
        globalAccountItem={
          <AkDropdownMenu
            position="right bottom"
            appearance="tall"
            items={[
              {
                heading: 'Joshua Nelson',
                items: [
                  { content: 'View profile' },
                  { content: 'Manage Atlassian account' },
                  { content: 'Bitbucket settings' },
                  { content: 'Integrations' },
                  { content: 'Bitbucket labs' },
                  { content: 'Log out' },
                ],
              },
            ]}
          >
            <AkGlobalItem>
              <AkAvatar src={emmaAvatar} size="small" />
            </AkGlobalItem>
          </AkDropdownMenu>
        }
        onSearchDrawerActivated={this.activate('search')}
        onCreateDrawerActivated={this.activate('create')}
        isCreateDrawerOpen={this.state.openDrawer === 'create'}
        isSearchDrawerOpen={this.state.openDrawer === 'search'}
        onBlanketClicked={action('blanket clicked')}
        onResize={this.resize}
        hasBlanket
        isOpen={this.state.isOpen}
        width={this.state.width}
        {...this.props}
      >
        {this.props.children}
      </Navigation>
    );
  }
}
