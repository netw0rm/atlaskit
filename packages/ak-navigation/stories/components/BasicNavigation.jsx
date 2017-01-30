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
    drawerContent: PropTypes.node,
    isAnyDrawerOpen: PropTypes.bool,
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
        icon={
          <img alt="nucleus" src={nucleusLogo} />
        }
        text="AtlasKit"
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
            icon={<img alt="icon" src={nucleusLogo} />}
            text="Item with an icon"
          />
          <AkDrawerItem
            icon={<img alt="icon" src={nucleusLogo} />}
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
      currentDrawerOffset: 0,
    };
  }

  openDrawer(name, event) {
    this.setState({
      openDrawer: name,
      currentDrawerOffset: event.currentTarget.getBoundingClientRect().top,
    });
  }

  closeDrawer() {
    this.setState({
      openDrawer: null,
      currentDrawerOffset: 0,
    });
  }

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
        globalAccountItem={
          <AkDropdownMenu
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
              <AkAvatar size="small" src={emmaAvatar} />
            </AkGlobalItem>
          </AkDropdownMenu>
        }
        globalCreateIcon={<CreateIcon label="Create icon" />}
        globalHelpItem={
          <AkDropdownMenu
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
            position="right bottom"
          >
            <AkGlobalItem>
              <HelpIcon label="Help icon" />
            </AkGlobalItem>
          </AkDropdownMenu>
        }
        globalPrimaryIcon={<AtlassianIcon label="Atlassian icon" size="medium" />}
        globalPrimaryItemHref="http://www.atlassian.com"
        globalSearchIcon={<SearchIcon label="Search icon" />}
        hasBlanket
        isCreateDrawerOpen={this.state.openDrawer === 'create'}
        isOpen={this.state.isOpen}
        isSearchDrawerOpen={this.state.openDrawer === 'search'}
        onBlanketClicked={action('blanket clicked')}
        onCreateDrawerClose={() => this.closeDrawer()}
        onCreateDrawerOpen={(e) => { this.openDrawer('create', e); }}
        onResize={this.resize}
        onSearchDrawerClose={() => this.closeDrawer()}
        onSearchDrawerOpen={(e) => { this.openDrawer('search', e); }}
        position="right bottom"
        resizeHandler={action('resize')}
        width={this.state.width}
        drawerContent={this.props.drawerContent}
        displayBlanket={this.props.isAnyDrawerOpen || this.state.openDrawer !== null}
        backIconOffset={this.state.currentDrawerOffset}
        {...this.props}
      >
        {this.props.children}
      </Navigation>
    );
  }
}
