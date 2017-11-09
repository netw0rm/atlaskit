import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';
import { action } from '@kadira/storybook';
import AtlassianIcon from '@atlaskit/icon/glyph/atlassian';
import SearchIcon from '@atlaskit/icon/glyph/search';
import QuestionCircleIcon from '@atlaskit/icon/glyph/question-circle';
import AddIcon from '@atlaskit/icon/glyph/add';
import DashboardIcon from '@atlaskit/icon/glyph/dashboard';
import SettingsIcon from '@atlaskit/icon/glyph/settings';
import IssuesIcon from '@atlaskit/icon/glyph/issues';
import ArrowLeftIcon from '@atlaskit/icon/glyph/arrow-left';
import AkDropdownMenu, { DropdownItemGroup, DropdownItem } from '@atlaskit/dropdown-menu';
import AkAvatar from '@atlaskit/avatar';
import Tooltip from '@atlaskit/tooltip';

import BasicSearch from './BasicSearch';
import Navigation, { AkContainerTitle, AkNavigationItemGroup, AkNavigationItem, AkSearchDrawer, AkCreateDrawer, AkGlobalItem } from '@atlaskit/navigation';
import nucleusLogo from '../assets/nucleus.png';
import emmaAvatar from '../assets/emma.png';

export default class BasicNavigation extends PureComponent {
  static propTypes = {
    children: PropTypes.node,
    containerHeaderComponent: PropTypes.func,
    containerTheme: PropTypes.object, // eslint-disable-line react/forbid-prop-types
    createDrawerContent: PropTypes.node,
    defaultOpen: PropTypes.bool,
    drawers: PropTypes.arrayOf(PropTypes.node),
    globalSecondaryActions: PropTypes.arrayOf(PropTypes.node),
    globalTheme: PropTypes.object, // eslint-disable-line react/forbid-prop-types
    globalSearchIcon: PropTypes.node,
    onResizeCallback: PropTypes.func,
    openDrawer: PropTypes.string,
    searchDrawerContent: PropTypes.node,
    width: PropTypes.number,
  }

  static defaultProps = {
    drawers: [],
    onResizeCallback: () => {},
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
      <AkDropdownMenu
        appearance="tall"
        position="right bottom"
        trigger={
          <AkGlobalItem>
            <QuestionCircleIcon
              label="Help icon"
              secondaryColor="inherit"
              size="medium"
            />
          </AkGlobalItem>
        }
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
          <DropdownItem>Plans & pricing</DropdownItem>
          <DropdownItem>Site status</DropdownItem>
          <DropdownItem>Version info</DropdownItem>
        </DropdownItemGroup>
        <DropdownItemGroup title="Legal">
          <DropdownItem>Terms of service</DropdownItem>
          <DropdownItem>Privacy policy</DropdownItem>
        </DropdownItemGroup>
      </AkDropdownMenu>,
      <AkDropdownMenu
        appearance="tall"
        position="right bottom"
        trigger={
          <AkGlobalItem>
            <AkAvatar size="small" name="User profile" src={emmaAvatar} borderColor="default" />
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
    globalSearchIcon: <SearchIcon label="Search icon" secondaryColor="inherit" size="medium" />,
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
    const globalPrimaryIcon = <AtlassianIcon label="Atlassian icon" size="large" />;
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
        globalPrimaryIcon={globalPrimaryIcon}
        globalPrimaryItemHref="//www.atlassian.com"
        globalSearchIcon={this.props.globalSearchIcon}
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
            primaryIcon={globalPrimaryIcon}
          >
            {
              this.props.searchDrawerContent ?
              this.props.searchDrawerContent :
              <BasicSearch />
            }
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
      >
        {this.props.children}
      </Navigation>
    );
  }
}
