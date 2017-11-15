import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';
import { action } from '@kadira/storybook';
import AtlassianIcon from '@atlaskit/icon/glyph/atlassian';
import SearchIcon from '@atlaskit/icon/glyph/search';
import QuestionCircleIcon from '@atlaskit/icon/glyph/question-circle';
import AddIcon from '@atlaskit/icon/glyph/add';
import DashboardIcon from '@atlaskit/icon/glyph/dashboard';
import HomeIcon from '@atlaskit/icon/glyph/home-filled';
import SettingsIcon from '@atlaskit/icon/glyph/settings';
import IssuesIcon from '@atlaskit/icon/glyph/issues';
import ArrowLeftIcon from '@atlaskit/icon/glyph/arrow-left';
import AkDropdownMenu, { DropdownItemGroup, DropdownItem } from '@atlaskit/dropdown-menu';
import AkAvatar from '@atlaskit/avatar';
import Tooltip from '@atlaskit/tooltip';
import BasicSearch from './BasicSearch';
import Navigation, { AkContainerTitle, AkNavigationItemGroup, AkNavigationItem, AkSearchDrawer, AkCreateDrawer, AkGlobalItem } from '../../src/index';
import nucleusLogo from '../nucleus.png';
import emmaAvatar from '../emma.png';
import SelectableDropdownMenu from './SelectableDropdownMenu';

export default class BasicNavigation extends PureComponent {
  static propTypes = {
    children: PropTypes.node,
    width: PropTypes.number,
    containerHeaderComponent: PropTypes.func,
    defaultOpen: PropTypes.bool,
    openDrawer: PropTypes.string,
    searchDrawerContent: PropTypes.node,
    createDrawerContent: PropTypes.node,
    globalSecondaryActions: PropTypes.arrayOf(PropTypes.node),
    drawers: PropTypes.arrayOf(PropTypes.node),
    onResizeCallback: PropTypes.func,
    globalTheme: PropTypes.object, // eslint-disable-line react/forbid-prop-types
    containerTheme: PropTypes.object, // eslint-disable-line react/forbid-prop-types
    globalPrimaryIcon: PropTypes.node,
  }

  static defaultProps = {
    drawers: [],
    onResizeCallback: () => {},
    globalPrimaryIcon: <AtlassianIcon label="Atlassian icon" size="large" />,
    children: (<div>
      <AkNavigationItem
        icon={<DashboardIcon label="Dashboard" secondaryColor="inherit" />}
        text="Item A"
      />
      <AkNavigationItem
        icon={<SettingsIcon label="Settings" secondaryColor="inherit" />}
        isSelected
        text="Selected item"
      />
      <AkNavigationItem
        icon={<IssuesIcon label="Projects" secondaryColor="inherit" />}
        text="Item C"
      />
    </div>),
    defaultOpen: true,
    containerHeaderComponent: () => (
      <AkContainerTitle
        href="#foo"
        icon={
          <img alt="nucleus" src={nucleusLogo} />
        }
        text="AtlasKit"
        subText="Is the king"
      />),
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
      <Tooltip position="right" description="Back">
        <SelectableDropdownMenu
          appearance="tall"
          position="right bottom"
          trigger={isOpen => (
            <AkGlobalItem isSelected={isOpen}>
              <QuestionCircleIcon
                label="Help icon"
                secondaryColor="inherit"
                size="medium"
              />
            </AkGlobalItem>
          )}
        >
          <DropdownItemGroup title="Help">
            <DropdownItem>Documentation</DropdownItem>
            <DropdownItem>Learn Git</DropdownItem>
            <DropdownItem>Keyboard shortcuts</DropdownItem>
            <DropdownItem>Bitbucket tutorials</DropdownItem>
            <DropdownItem>API</DropdownItem>
            <DropdownItem>Support</DropdownItem>
          </DropdownItemGroup>
          <DropdownItemGroup title="Information">
            <DropdownItem>Latest features</DropdownItem>
            <DropdownItem>Blog</DropdownItem>
            <DropdownItem>Plans and pricing</DropdownItem>
            <DropdownItem>Site status</DropdownItem>
            <DropdownItem>Version info</DropdownItem>
          </DropdownItemGroup>
          <DropdownItemGroup title="Legal">
            <DropdownItem>Terms of service</DropdownItem>
            <DropdownItem>Privacy policy</DropdownItem>
          </DropdownItemGroup>
        </SelectableDropdownMenu>
      </Tooltip>,
      <AkDropdownMenu
        appearance="tall"
        position="right bottom"
        trigger={
          <AkGlobalItem>
            <Tooltip position="right" description="User profile">
              <AkAvatar size="small" src={emmaAvatar} borderColor="transparent" />
            </Tooltip>
          </AkGlobalItem>
        }
      >
        <DropdownItemGroup title="Luke Skywalker">
          <DropdownItem>View profile</DropdownItem>
          <DropdownItem>Manage Atlassian account</DropdownItem>
          <DropdownItem>Bitbucket settings</DropdownItem>
          <DropdownItem>Integrations</DropdownItem>
          <DropdownItem>Bitbucket labs</DropdownItem>
          <DropdownItem>Log out</DropdownItem>
        </DropdownItemGroup>
      </AkDropdownMenu>,
    ],
  }

  constructor(...args) {
    super(...args);
    this.state = {
      isOpen: this.props.defaultOpen,
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
    this.props.onResizeCallback(resizeState);
    this.setState({
      isOpen: resizeState.isOpen,
      width: resizeState.width,
    });
  }

  render() {
    const backIcon = <Tooltip position="right" description="Back"><ArrowLeftIcon label="Back icon" size="medium" /></Tooltip>;
    const ContainerHeader = this.props.containerHeaderComponent || (() => null);

    return (
      <Navigation
        containerTheme={this.props.containerTheme}
        globalTheme={this.props.globalTheme}
        backIconOffset={this.state.backIconOffset}
        containerHeaderComponent={ContainerHeader}
        globalCreateIcon={
          <Tooltip position="right" description="Create">
            <AddIcon label="Create icon" secondaryColor="inherit" size="medium" />
          </Tooltip>
        }
        globalHomeHref="//www.atlassian.com"
        globalHomeIcon={
          <Tooltip position="right" description="Home">
            <HomeIcon label="Home" secondaryColor="inherit" size="medium" />
          </Tooltip>
        }
        globalPrimaryIcon={this.props.globalPrimaryIcon}
        globalPrimaryItemHref="//www.atlassian.com"
        globalSearchIcon={
          <Tooltip position="right" description="Search">
            <SearchIcon label="Search icon" secondaryColor="inherit" size="medium" />
          </Tooltip>}
        globalSecondaryActions={this.props.globalSecondaryActions}
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
        drawers={[
          ...this.props.drawers,
          (<AkSearchDrawer
            backIcon={backIcon}
            isOpen={this.state.openDrawer === 'search'}
            key="search"
            onBackButton={this.closeDrawer}
            primaryIcon={this.props.globalPrimaryIcon}
          >
            {
              this.props.searchDrawerContent
              ? this.props.searchDrawerContent
              : <BasicSearch />
            }
          </AkSearchDrawer>),
          (<AkCreateDrawer
            backIcon={backIcon}
            header={<ContainerHeader />}
            isOpen={this.state.openDrawer === 'create'}
            key="create"
            onBackButton={this.closeDrawer}
            primaryIcon={this.props.globalPrimaryIcon}
          >
            {this.props.createDrawerContent}
          </AkCreateDrawer>),
        ]}
      >
        {this.props.children}
      </Navigation>
    );
  }
}
