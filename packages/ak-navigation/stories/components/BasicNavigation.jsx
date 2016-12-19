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
  }

  static defaultProps = {
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
        globalSearchIcon={<SearchIcon />}
        globalCreateIcon={<CreateIcon />}
        globalPrimaryItem={
          <AkGlobalItem size="large">
            <AtlassianIcon size="medium" />
          </AkGlobalItem>
        }
        globalHelpItem={
          <AkDropdownMenu
            position="right bottom"
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
              <HelpIcon />
            </AkGlobalItem>
          </AkDropdownMenu>
        }
        globalAccountItem={
          <AkDropdownMenu
            position="right bottom"
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
        onResize={action('resized')}
        hasBlanket
        {...this.props}
      >
        {this.props.children}
      </Navigation>
    );
  }
}
