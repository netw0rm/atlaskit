import React, { PureComponent } from 'react';
import { action } from '@kadira/storybook';
import Lorem from 'react-lorem-component';
import AtlassianIcon from '@atlaskit/icon/glyph/atlassian';
import SearchIcon from '@atlaskit/icon/glyph/search';
import QuestionCircleIcon from '@atlaskit/icon/glyph/question-circle';
import AddIcon from '@atlaskit/icon/glyph/add';
import ExpandIcon from '@atlaskit/icon/glyph/expand';
import ListIcon from '@atlaskit/icon/glyph/list';
import ArrowLeftIcon from '@atlaskit/icon/glyph/arrow-left';
import Avatar from '@atlaskit/avatar';
import Page, { Grid, GridColumn } from '@atlaskit/page';
import DropdownMenu from '@atlaskit/dropdown-menu';
import Tooltip from '@atlaskit/tooltip';
import BasicSearch from '../components/BasicSearch';
import Navigation, { AkContainerTitle, AkNavigationItemGroup, AkNavigationItem, AkSearchDrawer, AkCreateDrawer, AkGlobalItem } from '../../src/index';
import nucleusLogo from '../nucleus.png';
import emmaAvatar from '../emma.png';

const projectList = [
  {
    items: [
      { content: 'Confluence' },
      { content: 'Fabric' },
      { content: 'JIRA' },
      { content: 'Media Player' },
    ],
  },
];
const manyNavigationItems = () => {
  const items = [];
  for (let i = 0; i < 40; i++) {
    items.push(
      <AkNavigationItem
        href={`#${i}`}
        key={i}
        text="Test page"
      />
    );
  }
  return items;
};

export default class JIRAProjectSwitcherExample extends PureComponent {
  constructor(...args) {
    super(...args);
    this.state = {
      isOpen: true,
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
    const backIcon = <Tooltip position="right" description="Back"><ArrowLeftIcon label="Back icon" size="medium" /></Tooltip>;
    const globalPrimaryIcon = <AtlassianIcon label="Atlassian icon" size="large" />;
    const globalCreateIcon = (
      <Tooltip position="right" description="Create">
        <AddIcon label="Create icon" secondaryColor="inherit" size="medium" />
      </Tooltip>);

    const globalSearchIcon = (
      <Tooltip position="right" description="Search">
        <SearchIcon label="Search icon" secondaryColor="inherit" size="medium" />
      </Tooltip>);

    const headerComponent = (
      <AkContainerTitle
        href="#foo"
        icon={
          <img alt="nucleus" src={nucleusLogo} />
        }
        text="AtlasKit"
        subText="Is the king"
      />
    );

    const HeaderComponent = () => [
      headerComponent,
      <DropdownMenu
        shouldFitContainer={this.state.isOpen}
        position="bottom left"
        items={projectList}
      >
        <AkNavigationItem
          isDropdownTrigger
          icon={<ListIcon label="List" />}
          dropIcon={<ExpandIcon label="Chevron" />}
          text="Change project"
        />
      </DropdownMenu>,
    ];

    const helpMenu = (
      <DropdownMenu
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
        <AkGlobalItem href="">
          <QuestionCircleIcon
            label="Help icon"
            secondaryColor="inherit"
            size="medium"
          />
        </AkGlobalItem>
      </DropdownMenu>
      );

    const userMenu = (
      <DropdownMenu
        appearance="tall"
        items={[
          {
            heading: 'Luke Skywalker',
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
        <AkGlobalItem href="">
          <Avatar size="medium" src={emmaAvatar} />
        </AkGlobalItem>
      </DropdownMenu>
      );

    const searchDrawer = (
      <AkSearchDrawer
        backIcon={backIcon}
        isOpen={this.state.openDrawer === 'search'}
        key="search"
        onBackButton={this.closeDrawer}
        primaryIcon={globalPrimaryIcon}
      >
        <BasicSearch />
      </AkSearchDrawer>
      );

    const createDrawer = (
      <AkCreateDrawer
        backIcon={backIcon}
        header={headerComponent}
        isOpen={this.state.openDrawer === 'create'}
        key="create"
        onBackButton={this.closeDrawer}
        primaryIcon={globalPrimaryIcon}
      >
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
      </AkCreateDrawer>
      );

    return (
      <Page
        navigation={<Navigation
          containerHeaderComponent={HeaderComponent}
          globalCreateIcon={globalCreateIcon}
          globalPrimaryIcon={globalPrimaryIcon}
          globalPrimaryItemHref="//www.atlassian.com"
          globalSearchIcon={globalSearchIcon}
          isOpen={this.state.isOpen}
          globalSecondaryActions={[helpMenu, userMenu]}
          onCreateDrawerOpen={() => { this.openDrawer('create'); }}
          onResize={this.resize}
          onResizeStart={action('resizeStart')}
          onSearchDrawerOpen={() => { this.openDrawer('search'); }}
          openDrawer={this.state.openDrawer}
          resizeHandler={action('resize')}
          width={this.state.width}
          drawers={[searchDrawer, createDrawer]}
        >
          {manyNavigationItems()}
        </Navigation>}
      >
        <Grid layout="fixed">
          <GridColumn medium={12}>
            <Lorem count="30" />
          </GridColumn>
        </Grid>
      </Page>
    );
  }
}
