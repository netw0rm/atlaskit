import { action } from '@kadira/storybook';
import { akGridSizeUnitless } from '@atlaskit/util-shared-styles';
import AddIcon from '@atlaskit/icon/glyph/add';
import AkDropdownMenu, { DropdownItemGroup, DropdownItem } from '@atlaskit/dropdown-menu';
import ArrowLeftIcon from '@atlaskit/icon/glyph/arrow-left';
import Avatar from '@atlaskit/avatar';
import CalendarIcon from '@atlaskit/icon/glyph/calendar';
import ChevronRightIcon from '@atlaskit/icon/glyph/chevron-right';
import ConfluenceIcon from '@atlaskit/icon/glyph/confluence';
import EditorAlignLeftIcon from '@atlaskit/icon/glyph/editor/align-left';
import emmaAvatar from '../emma.png';
import HomeFilledIcon from '@atlaskit/icon/glyph/home-filled';
import JiraIcon from '@atlaskit/icon/glyph/jira';
import MediaServicesAddCommentIcon from '@atlaskit/icon/glyph/media-services/add-comment';
import MenuIcon from '@atlaskit/icon/glyph/menu';
import NotificationIcon from '@atlaskit/icon/glyph/notification';
import Navigation, {
  AkContainerTitle,
  AkNavigationItemGroup,
  AkNavigationItem,
  AkSearchDrawer,
  AkCreateDrawer,
  AkGlobalItem,
  AkContainerNavigationNested,
  AkSearch } from '../../src/index';
import Page, { Grid, GridColumn } from '@atlaskit/page';
import PageIcon from '@atlaskit/icon/glyph/page';
import QuoteIcon from '@atlaskit/icon/glyph/quote';
import QuestionCircleIcon from '@atlaskit/icon/glyph/question-circle';
import React, { PureComponent } from 'react';
import styled from 'styled-components';
import SearchIcon from '@atlaskit/icon/glyph/search';
import SettingsIcon from '@atlaskit/icon/glyph/settings';
import Tooltip from '@atlaskit/tooltip';

const DropdownWrapper = styled.div`padding-bottom: ${akGridSizeUnitless / 2}px`;
const backIcon = <Tooltip position="right" description="Back"><ArrowLeftIcon label="Back icon" size="medium" /></Tooltip>;
const globalPrimaryIcon = <ConfluenceIcon label="Confluence icon" size="large" />;

export default class ConfluenceSpacePage extends PureComponent {
  constructor(...args) {
    super(...args);
    this.state = {
      stack: [
        [
          <AkNavigationItem
            text="Page 1 Parent"
            icon={<ArrowLeftIcon label="Children" size="medium" />}
          />,
          <AkNavigationItem
            icon={<ChevronRightIcon label="Children" size="medium" />}
            text="Page 2 Chilren"
            isSelected
          />,
          <AkNavigationItem
            text="Confluence"
            icon={<Tooltip position="right" description="Confluence"><ConfluenceIcon label="Confluence icon" size="medium" /></Tooltip>}
          />,
          <AkNavigationItem
            text="Pages"
            icon={<Tooltip position="right" description="Pages"><PageIcon label="Page icon" size="medium" /></Tooltip>}
          />,
          <AkNavigationItem
            text="Blog"
            icon={<Tooltip position="right" description="Blog"><QuoteIcon label="Quote icon" size="medium" /></Tooltip>}
          />,
          <AkNavigationItem
            text="Questions"
            icon={<Tooltip position="right" description="Questions"><MediaServicesAddCommentIcon label="Questions icon" size="medium" /></Tooltip>}
          />,
          <AkNavigationItem
            text="Calendar"
            icon={<Tooltip position="right" description="Space tools"><CalendarIcon label="Settings icon" size="medium" /></Tooltip>}
          />,
          <AkNavigationItem
            text="Questions"
            icon={<Tooltip position="right" description="Space tools"><SettingsIcon label="Settings icon" size="medium" /></Tooltip>}
          />,
        ],
      ],
      menuLoading: true,
      openDrawer: null,
      width: this.props.width,
    };
  }

  getCreateDrawer = () => (
    <AkCreateDrawer
      backIcon={backIcon}
      isOpen={this.state.openDrawer === 'create'}
      key="create"
      onBackButton={this.closeDrawer}
      primaryIcon={globalPrimaryIcon}
    >
      <AkNavigationItem text="Item outside a group" />
      <AkNavigationItemGroup title="Create item group">
        <AkNavigationItem
          icon={<ConfluenceIcon label="Confluence icon" />}
          text="Item with an icon"
        />
        <AkNavigationItem
          icon={<JiraIcon label="Jira icon" />}
          text="A really, really, quite long, actually super long container name"
        />
      </AkNavigationItemGroup>
    </AkCreateDrawer>
  );

  getSearchDrawer = () => (
    <AkSearchDrawer
      backIcon={backIcon}
      isOpen={this.state.openDrawer === 'search'}
      key="seach"
      onBackButton={this.closeDrawer}
      primaryIcon={globalPrimaryIcon}
      onInput={this._onInput}
    >

      <AkSearch
        placeholder="Search..."
        onInput={this._onInput}
        onSearchClear={this._clearSearch}
        onKeyDown={() => {}}
      >
        <AkNavigationItemGroup title="RECENTLY VIEWED">
          <AkNavigationItem
            icon={<EditorAlignLeftIcon label="Editor icon" />}
            text="Article 1"
          />
          <AkNavigationItem
            icon={<EditorAlignLeftIcon label="Editor icon" />}
            text="Article 2"
          />
        </AkNavigationItemGroup>
        <AkNavigationItemGroup title="RECENT SPACES">
          <AkNavigationItem
            icon={<ConfluenceIcon label="Confluence icon" />}
            text="Confluence"
          />
          <AkNavigationItem
            icon={<JiraIcon label="Jira icon" />}
            text="Jira"
          />
        </AkNavigationItemGroup>
      </AkSearch >

    </AkSearchDrawer>
  )

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
      isOpen: !this.state.isOpen,
      width: this.state.isOpen ? resizeState.width : this.state.width,
    });
    if (resizeState.width >= this.state.width && this.state.isOpen !== resizeState.isOpen) {
      this.setState({
        isOpen: !this.state.isOpen,
        width: resizeState.width,
      });
    }
  }

  goBackHome = () => {
    if (this.state.stack.length <= 1) {
      return false;
    }

    const stack = this.state.stack.slice(0, this.state.stack.length - 1);
    return this.setState({ stack });
  }

  timerMenu = () => {
    setTimeout(() => this.setState({ menuLoading: false }), 2000);
  }

  render() {
    const getContainerHeaderComponent = () => (
      <div>
        <AkContainerTitle
          href="#foo"
          icon={<ConfluenceIcon label="Confluence icon" size="xlarge" />}
          text="Confluence"
        />
        {this.state.stack.length > 1 ? (
          <AkNavigationItem
            icon={<ArrowLeftIcon label="Back" />}
            onClick={() => this.goBackHome()}
            onKeyDown={(event: KeyboardEvent) => {
              if (event.key === 'Enter') {
                this.goBackHome(true);
              }
            }}
            text="Back"
          />
        ) : null}
      </div>
    );
    const globalCreateIcon = (
      <Tooltip position="right" description="Create">
        <AddIcon label="Create icon" secondaryColor="inherit" size="medium" onClick={() => this.openDrawer('create')} />
      </Tooltip>);
    const globalSearchIcon = (
      <Tooltip position="right" description="Search">
        <SearchIcon label="Search icon" secondaryColor="inherit" size="medium" onClick={() => this.openDrawer('search')} />
      </Tooltip>);
    const helpMenu = (
      <AkDropdownMenu
        appearance="tall"
        position="right bottom"
        trigger={(
          <AkGlobalItem href="">
            <Tooltip position="right" description="Help">
              <QuestionCircleIcon
                label="Help icon"
                secondaryColor="inherit"
                size="medium"
              />
            </Tooltip>
          </AkGlobalItem>
          )}
      >
        <DropdownItemGroup title="HELP">
          <DropdownItem>Online Help</DropdownItem>
          <DropdownItem>Get the mobile app</DropdownItem>
          <DropdownItem>Feed Builder</DropdownItem>
          <DropdownItem>Keyboard Shortcuts</DropdownItem>
          <DropdownItem>Site Status</DropdownItem>
          <DropdownItem>{'What\'s new'}</DropdownItem>
          <DropdownItem>Available Gadgets</DropdownItem>
          <DropdownItem>About Confluence</DropdownItem>
          <DropdownItem>Feedback Page</DropdownItem>
          <DropdownItem>Lightbox</DropdownItem>
          <DropdownItem>Questions</DropdownItem>
        </DropdownItemGroup>
        <DropdownItemGroup title="LEGAL">
          <DropdownItem>Terms of service</DropdownItem>
          <DropdownItem>Privacy policy</DropdownItem>
        </DropdownItemGroup>
      </AkDropdownMenu>
      );

    const userMenu = (
      <AkDropdownMenu
        appearance="tall"
        position="right bottom"
        trigger={(
          <AkGlobalItem href="">
            <Tooltip position="right" description="Your profile and settings">
              <Avatar size="medium" src={emmaAvatar} borderColor="default" />
            </Tooltip>
          </AkGlobalItem>
            )}
      >
        <DropdownItemGroup title="NEW CONFLUENCE EXPERIENCE">
          <DropdownItem>{'What\'s changed'}</DropdownItem>
          <DropdownItem>Give feedback</DropdownItem>
        </DropdownItemGroup>
        <DropdownItem>Turn off for now</DropdownItem>
        <DropdownItemGroup title="MY CONFLUENCE">
          <DropdownItem>Add Personnal Space...</DropdownItem>
          <DropdownItem>Recently Viewed</DropdownItem>
          <DropdownItem>Profile</DropdownItem>
          <DropdownItem>Tasks</DropdownItem>
          <DropdownItem>Saved for later</DropdownItem>
          <DropdownItem>Watches</DropdownItem>
          <DropdownItem>Drafts</DropdownItem>
          <DropdownItem>Network</DropdownItem>
          <DropdownItem>Settings</DropdownItem>
          <DropdownItem>Log Out</DropdownItem>
        </DropdownItemGroup>
      </AkDropdownMenu>
        );

    const notificationsMenu = (
      <AkDropdownMenu
        appearance="tall"
        onOpenChange={({ isOpen }) => {
          if (isOpen) {
            this.timerMenu();
          }
        }}
        position="right bottom"
        isLoading={this.state.menuLoading}
        trigger={(
          <AkGlobalItem href="">
            <Tooltip position="right" description="Notifications">
              <NotificationIcon
                label="Notifications icon"
                size="medium"
              />
            </Tooltip>
          </AkGlobalItem>
          )}
      >
        <DropdownItemGroup title="NOTIFICATIONS">
          <DropdownItem>Hi</DropdownItem>
          <DropdownItem>Nothing to be notified...</DropdownItem>
        </DropdownItemGroup>
      </AkDropdownMenu>
        );

    const appSwitcherMenu = (
      <DropdownWrapper>
        <AkDropdownMenu
          appearance="tall"
          position="right bottom"
          onOpenChange={({ isOpen }) => {
            if (isOpen) {
              this.timerMenu();
            }
          }}
          isLoading={this.state.menuLoading}
          trigger={(
            <AkGlobalItem href="">
              <Tooltip position="right" description="Applications Switcher">
                <MenuIcon
                  label="Applications Switcher"
                  size="medium"
                />
              </Tooltip>
            </AkGlobalItem>
          )}
        >
          <AkNavigationItem
            icon={<HomeFilledIcon label="Home icon" />}
            text="Home"
            href="https://servicedog.atlassian.net/home"
          />
          <AkNavigationItem
            icon={<JiraIcon label="Jira icon" />}
            text="Jira"
            href="https://ecosystem.atlassian.net/home"
          />
        </AkDropdownMenu>
      </DropdownWrapper>
      );

    return (
      <Page
        navigation={<Navigation
          drawers={[
            this.getSearchDrawer(),
            this.getCreateDrawer(),
          ]}
          containerHeaderComponent={getContainerHeaderComponent}
          globalCreateIcon={globalCreateIcon}
          globalPrimaryIcon={globalPrimaryIcon}
          globalPrimaryItemHref="//www.atlassian.com/software/confluence"
          globalSearchIcon={globalSearchIcon}
          isOpen={this.state.isOpen}
          globalSecondaryActions={[notificationsMenu, appSwitcherMenu, helpMenu, userMenu]}
          onResize={this.resize}
          onResizeStart={action('resizeStart')}
          width={this.state.width}
          hasScrollHintTop
        >
          <AkContainerNavigationNested
            stack={this.state.stack}
          />
        </Navigation>}
      >
        <Grid layout="fixed">
          <GridColumn medium={12}>
            <AkNavigationItem
              icon={<ConfluenceIcon label="Home icon" />}
              text="Page Space - Page Title - Links"
              href="https://servicedog.atlassian.net/home"
            />
            <h1>Page Title</h1>
            <br />
            <Avatar size="medium" src={emmaAvatar} borderColor="default" />
            <br />
            <h2>Note</h2>
            <p> Currently, the navigation in Confluence is based on page tree.</p>
            <p> Atlaskit does not support it at the moment. This story is just a placeholder.</p>
            <p> Clicking on &lt;- Page 1 Parent will redirect user on the parent page.</p>
            <p> Clicking on &gt; Page 2 Children will display the children pages.</p>
          </GridColumn>
        </Grid>
      </Page>
    );
  }
}
