import React, { PureComponent, PropTypes } from 'react';
import { action } from '@kadira/storybook';
import { AtlassianIcon, SearchIcon, QuestionCircleIcon, AddIcon, DashboardIcon, SettingsIcon, IssuesIcon, ArrowleftIcon } from '@atlaskit/icon';
import AkDropdownMenu from '@atlaskit/dropdown-menu';
import AkAvatar from '@atlaskit/avatar';
import BasicSearch from './BasicSearch';
import Navigation, { AkContainerTitle, AkNavigationItemGroup, AkNavigationItem, AkSearchDrawer, AkCreateDrawer, AkGlobalItem } from '../../src/index';
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
    globalSecondaryActions: PropTypes.arrayOf(PropTypes.node),
  }

  static defaultProps = {
    children: (<div>
      <AkNavigationItem
        icon={<DashboardIcon label="Dashboard" />}
        text="Item A"
      />
      <AkNavigationItem
        icon={<SettingsIcon label="Settings" />}
        text="Item B"
      />
      <AkNavigationItem
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
        subText="Is the king"
      />),
    searchDrawerContent: (<BasicSearch />),
    createDrawerContent: (
      <div>
        <AkNavigationItem
          text="Item outside a group"
        />
        <AkNavigationItemGroup
          title="Create item group"
        >
          <AkNavigationItem
            icon={<img alt="icon" src={nucleusLogo} />}
            text="Item with an icon"
          />
          <AkNavigationItem
            icon={<img alt="icon" src={nucleusLogo} />}
            text="A really, really, quite long, actually super long container name"
          />
        </AkNavigationItemGroup>
      </div>),
    globalSecondaryActions: [
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
      </AkDropdownMenu>,
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
      </AkDropdownMenu>,
    ],
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
    if (name === 'search') {
      action('onSearchDrawerOpen')();
    }

    if (name === 'create') {
      action('onCreateDrawerOpen')();
    }
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
    action('onResize')();
    this.setState({
      isOpen: resizeState.isOpen,
      width: resizeState.width,
    });
  }

  render() {
    const backIcon = <ArrowleftIcon label="Back icon" size="medium" />;
    const globalPrimaryIcon = <AtlassianIcon label="Atlassian icon" size="medium" />;
    const ContainerHeader = this.props.containerHeaderComponent || (() => null);
    return (
      <Navigation
        backIconOffset={this.state.backIconOffset}
        containerHeaderComponent={ContainerHeader}
        globalCreateIcon={<AddIcon size="small" label="Create icon" />}
        globalPrimaryIcon={globalPrimaryIcon}
        globalPrimaryItemHref="//www.atlassian.com"
        globalSearchIcon={<SearchIcon label="Search icon" />}
        globalSecondaryActions={this.props.globalSecondaryActions}
        drawers={[
          (<AkSearchDrawer
            backIcon={backIcon}
            isOpen={this.state.openDrawer === 'search'}
            key="search"
            onBackButton={this.closeDrawer}
            primaryIcon={globalPrimaryIcon}
          >
            {this.props.searchDrawerContent}
          </AkSearchDrawer>),
          (<AkCreateDrawer
            backIcon={backIcon}
            header={<ContainerHeader />}
            isOpen={this.state.openDrawer === 'create'}
            key="create"
            onBackButton={this.closeDrawer}
            primaryIcon={globalPrimaryIcon}
          >
            {this.props.createDrawerContent}
          </AkCreateDrawer>),
        ]}
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
