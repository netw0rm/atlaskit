import React, { PureComponent, PropTypes } from 'react';
import { action } from '@kadira/storybook';
import { AtlassianIcon, SearchIcon, HelpIcon, CreateIcon, DashboardIcon, SettingsIcon, ProjectsIcon, ArrowleftIcon } from 'ak-icon';
import AkDropdownMenu from 'ak-dropdown-menu';
import AkAvatar from 'ak-avatar';
import Navigation, { AkContainerHeader, AkContainerItemGroup, AkContainerItem, AkDrawerItem, AkGlobalItem } from '../../src/index';
import nucleusLogo from '../nucleus.png';
import emmaAvatar from '../emma.png';

export default class BasicNavigation extends PureComponent {
  static propTypes = {
    children: PropTypes.node,
    isOpen: PropTypes.bool,
    width: PropTypes.number,
    containerHeader: PropTypes.node,
    openDrawer: PropTypes.string,
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
    containerHeader: (
      <AkContainerHeader
        href="#foo"
        text="AtlasKit"
        icon={
          <img alt="nucleus" src={nucleusLogo} />
        }
      />),
    createDrawerContent: (
      <div>
        <AkDrawerItem
          text="Item outside a group"
        />
        <AkContainerItemGroup
          title="Create item group"
        >
          <AkDrawerItem
            icon={<img src={nucleusLogo} alt="icon" />}
            text="Item with an icon"
          />
          <AkDrawerItem
            icon={<img src={nucleusLogo} alt="icon" />}
            text="A really, really, quite long, actually super long container name"
          />
        </AkContainerItemGroup>
      </div>),
    openDrawer: null,
  }

  constructor(...args) {
    super(...args);
    this.state = {
      isOpen: this.props.isOpen,
      openDrawer: this.props.openDrawer,
      width: this.props.width,
    };
  }

  openDrawer = name =>
    () => this.setState({
      openDrawer: name,
    });

  closeDrawer = () =>
    () => this.setState({
      openDrawer: null,
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
        containerHeader={this.props.containerHeader}
        drawerBackIcon={<ArrowleftIcon label="Back icon" size="medium" />}
        globalCreateIcon={<CreateIcon label="Create icon" />}
        globalPrimaryIcon={<AtlassianIcon label="Atlassian icon" size="medium" />}
        globalPrimaryItemHref="http://www.atlassian.com"
        globalSearchIcon={<SearchIcon label="Search icon" />}
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
        hasBlanket
        isCreateDrawerOpen={this.state.openDrawer === 'create'}
        isOpen={this.state.isOpen}
        isSearchDrawerOpen={this.state.openDrawer === 'search'}
        onBlanketClicked={action('blanket clicked')}
        onCreateDrawerClose={this.closeDrawer()}
        onCreateDrawerOpen={this.openDrawer('create')}
        onResize={this.resize}
        onSearchDrawerClose={this.closeDrawer()}
        onSearchDrawerOpen={this.openDrawer('search')}
        resizeHandler={action('resize')}
        width={this.state.width}
        {...this.props}
      >
        {this.props.children}
      </Navigation>
    );
  }
}
