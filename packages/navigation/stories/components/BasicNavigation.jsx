import React, { PureComponent, PropTypes } from 'react';
import { action } from '@kadira/storybook';
import { AtlassianIcon, SearchIcon, QuestionCircleIcon, AddIcon, DashboardIcon, SettingsIcon, IssuesIcon, ArrowleftIcon } from '@atlaskit/icon';
import AkDropdownMenu from '@atlaskit/dropdown-menu';
import AkAvatar from '@atlaskit/avatar';
import Navigation, { AkContainerTitle, AkContainerItemGroup, AkContainerItem, AkDrawerItem, AkDrawer, AkGlobalItem } from '../../src/index';
import nucleusLogo from '../nucleus.png';
import emmaAvatar from '../emma.png';

export default class BasicNavigation extends PureComponent {
  static propTypes = {
    children: PropTypes.node,
    isOpen: PropTypes.bool,
    width: PropTypes.number,
    containerHeaderComponent: PropTypes.func,
    openDrawer: PropTypes.string,
    searchDrawerContent: PropTypes.node,
    createDrawerContent: PropTypes.node,
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
        icon={<IssuesIcon label="Projects" />}
        text="Item C"
      />
    </div>),
    containerHeaderComponent: () => (
      <AkContainerTitle
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
  }

  constructor(...args) {
    super(...args);
    this.state = {
      isOpen: this.props.isOpen,
      openDrawer: this.props.openDrawer,
      width: this.props.width,
    };
  }

  openDrawer = (name) => {
    this.setState({
      openDrawer: name,
    });
  }

  closeDrawer = () => {
    this.setState({
      openDrawer: null,
    });
  }

  resize = (resizeState) => {
    this.setState({
      isOpen: resizeState.isOpen,
      width: resizeState.width,
    });
  }

  render() {
    const backIcon = <ArrowleftIcon label="Back icon" size="medium" />;
    const globalPrimaryIcon = <AtlassianIcon label="Atlassian icon" size="medium" />;
    const ContainerHeader = this.props.containerHeaderComponent;
    return (
      <Navigation
        backIconOffset={this.state.backIconOffset}
        containerHeaderComponent={ContainerHeader}
        drawers={[
          (<AkDrawer
            backIcon={backIcon}
            backIconOffset={68}
            header={<ContainerHeader />}
            isOpen={this.state.openDrawer === 'search'}
            isWide
            key="search"
            onBackButton={this.closeDrawer}
            primaryIcon={globalPrimaryIcon}
          >
            {this.props.searchDrawerContent}
          </AkDrawer>),
          (<AkDrawer
            backIcon={backIcon}
            backIconOffset={108}
            header={<ContainerHeader />}
            isOpen={this.state.openDrawer === 'create'}
            key="create"
            onBackButton={this.closeDrawer}
            primaryIcon={globalPrimaryIcon}
          >
            {this.props.createDrawerContent}
          </AkDrawer>),
        ]}
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
        globalCreateIcon={<AddIcon size="small" label="Create icon" />}
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
              <QuestionCircleIcon label="Help icon" />
            </AkGlobalItem>
          </AkDropdownMenu>
        }
        globalPrimaryIcon={globalPrimaryIcon}
        globalPrimaryItemHref="//www.atlassian.com"
        globalSearchIcon={<SearchIcon label="Search icon" />}
        isOpen={this.state.isOpen}
        onCreateDrawerOpen={() => { this.openDrawer('create'); }}
        onResize={this.resize}
        onResizeStart={action('resizeStart')}
        onSearchDrawerOpen={() => { this.openDrawer('search'); }}
        openDrawer={this.state.openDrawer}
        position="right bottom"
        resizeHandler={action('resize')}
        width={this.state.width}
        {...this.props}
      >
        {this.props.children}
      </Navigation>
    );
  }
}
