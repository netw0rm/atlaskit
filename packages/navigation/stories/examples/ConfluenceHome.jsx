import { action } from '@kadira/storybook';
import { akGridSizeUnitless } from '@atlaskit/util-shared-styles';
import AddIcon from '@atlaskit/icon/glyph/add';
import AddonIcon from '@atlaskit/icon/glyph/addon';
import { DropdownItemGroup, DropdownItem } from '@atlaskit/dropdown-menu';
import ArrowLeftIcon from '@atlaskit/icon/glyph/arrow-left';
import Avatar from '@atlaskit/avatar';
import Button from '@atlaskit/button';
import ChevronRightIcon from '@atlaskit/icon/glyph/chevron-right';
import CalendarIcon from '@atlaskit/icon/glyph/calendar';
import ConfluenceIcon from '@atlaskit/icon/glyph/confluence';
import { ConfluenceLogo } from '@atlaskit/logo';
import CrossCircleIcon from '@atlaskit/icon/glyph/cross-circle';
import DiscoverIcon from '@atlaskit/icon/glyph/discover';
import EditorAlignLeftIcon from '@atlaskit/icon/glyph/editor/align-left';
import EditorFeedbackIcon from '@atlaskit/icon/glyph/editor/feedback';
import emmaAvatar from '../emma.png';
import FolderIcon from '@atlaskit/icon/glyph/folder';
import { getProvided } from '../../src/theme/util';
import HomeFilledIcon from '@atlaskit/icon/glyph/home-filled';
import JiraIcon from '@atlaskit/icon/glyph/jira';
import Lorem from 'react-lorem-component';
import MenuIcon from '@atlaskit/icon/glyph/menu';
import NotificationIcon from '@atlaskit/icon/glyph/notification';
import Navigation, {
  AkContainerLogo,
  AkContainerNavigationNested,
  AkCreateDrawer,
  AkNavigationItemGroup,
  AkNavigationItem,
  AkSearch,
  AkSearchDrawer,
  AkGlobalItem,
  presetThemes } from '../../src/index';
import Page, { Grid, GridColumn } from '@atlaskit/page';
import PeopleIcon from '@atlaskit/icon/glyph/people';
import QuestionCircleIcon from '@atlaskit/icon/glyph/question-circle';
import QuestionConfluence from '../questions-white.svg';
import React, { PureComponent } from 'react';
import styled from 'styled-components';
import SearchIcon from '@atlaskit/icon/glyph/search';
import SettingsIcon from '@atlaskit/icon/glyph/settings';
import Tooltip from '@atlaskit/tooltip';
import TrayIcon from '@atlaskit/icon/glyph/tray';
import WorldIcon from '@atlaskit/icon/glyph/world';
import SelectableDropdownMenu from '../components/SelectableDropdownMenu';

const DropdownWrapper = styled.div`padding-bottom: ${akGridSizeUnitless / 2}px`;
const backIcon = <Tooltip position="right" description="Back"><ArrowLeftIcon label="Back icon" size="medium" /></Tooltip>;
const globalPrimaryIcon = <ConfluenceIcon label="Confluence icon" size="large" />;

export default class ConfluenceHome extends PureComponent {
  constructor(...args) {
    super(...args);
    this.state = {
      isOpen: true,
      menuLoading: true,
      openDrawer: null,
      stack: [
        [
          <AkNavigationItem
            text="Activity"
            icon={<DiscoverIcon label="Activity icon" size="medium" />}
            isSelected
          />,
          <AkNavigationItem
            text="Your work"
            icon={<TrayIcon label="Your work icon" size="medium" />}
          />,
          <AkNavigationItem
            text="Spaces"
            icon={<FolderIcon label="Spaces icon" size="medium" />}
          />,
          <AkNavigationItem
            text="People"
            icon={<PeopleIcon label="People icon" size="medium" />}
          />,
          <AkNavigationItem
            action={
              <Button
                appearance="subtle"
                iconBefore={<ChevronRightIcon label="add" size="medium" />}
                spacing="none"
              />}
            text="Add-ons"
            onClick={() => this.addOnsNestedNav()}
            icon={<AddonIcon label="Add-ons icon" size="medium" />}
          />,
          <AkNavigationItem
            text="Settings"
            icon={<SettingsIcon label="Settings icon" size="medium" />}
          />,
          <AkNavigationItemGroup title="New Confluence Experience">
            <AkNavigationItem icon={<EditorFeedbackIcon label="Feedback icon" size="medium" />} text="Give feedback" />
            <AkNavigationItem icon={<CrossCircleIcon secondaryColor={({ theme }) => getProvided(theme).background.primary} label="Opt icon" size="medium" />}text="Opt out for now" />
          </AkNavigationItemGroup>,
          <AkNavigationItemGroup title="My Spaces">
            <AkNavigationItem icon={<ConfluenceIcon label="Confluence icon" size="medium" />} text="Confluence ADG 3" />
            <AkNavigationItem icon={<WorldIcon label="World icon" size="medium" />} text="Atlaskit" />
          </AkNavigationItemGroup>,
        ],
      ],
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

  addOnsNestedNav = () => {
    this.setState({
      stack: [
        ...this.state.stack,
        [
          <AkNavigationItem icon={<CalendarIcon label="Calendar" />} text="Calendars" />,
          <AkNavigationItem icon={<QuestionConfluence />} text="Questions" />,
        ],
      ],
    });
  }
  openDrawer = (name) => {
    if (name === 'search') {
      action('onSearchDrawerOpen')();
    }

    if (name === 'create') {
      action('onCreateDrawerOpen')();
    }

    if (name === 'nested') {
      action('onNestedNavigation')();
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
        <AkContainerLogo>
          <ConfluenceLogo
            collapseTo="type"
            size="medium"
          />
        </AkContainerLogo>
        {this.state.stack.length > 1 ? (
          <AkNavigationItem

            icon={<ArrowLeftIcon label="Add-ons icon" />}
            onClick={() => this.goBackHome()}
            onKeyDown={(event: KeyboardEvent) => {
              if (event.key === 'Enter') {
                this.goBackHome(true);
              }
            }}
            text="Add-ons"
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
      <SelectableDropdownMenu
        appearance="tall"
        position="right bottom"
        trigger={isOpen => (
          <AkGlobalItem href="" isSelected={isOpen}>
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
      </SelectableDropdownMenu>
    );

    const userMenu = (
      <SelectableDropdownMenu
        appearance="tall"
        position="right bottom"
        trigger={isOpen => (
          <AkGlobalItem href="" isSelected={isOpen}>
            <Tooltip position="right" description="Your profile and settings">
              <Avatar size="small" src={emmaAvatar} borderColor="transparent" />
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
      </SelectableDropdownMenu>
      );

    const notificationsMenu = (
      <SelectableDropdownMenu
        appearance="tall"
        onOpenChange={({ isOpen }) => {
          if (isOpen) {
            this.timerMenu();
          }
        }}
        position="right bottom"
        isLoading={this.state.menuLoading}
        trigger={isOpen => (
          <AkGlobalItem href="" isSelected={isOpen}>
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
      </SelectableDropdownMenu>
      );

    const appSwitcherMenu = (
      <DropdownWrapper>
        <SelectableDropdownMenu
          appearance="tall"
          position="right bottom"
          onOpenChange={({ isOpen }) => {
            if (isOpen) {
              this.timerMenu();
            }
          }}
          isLoading={this.state.menuLoading}
          trigger={isOpen => (
            <AkGlobalItem href="" isSelected={isOpen}>
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
        </SelectableDropdownMenu>
      </DropdownWrapper>
      );
    return (
      <Page
        navigation={<Navigation
          drawers={[
            this.getSearchDrawer(),
            this.getCreateDrawer(),
          ]}
          containerTheme={presetThemes.global}
          containerHeaderComponent={getContainerHeaderComponent}
          globalCreateIcon={globalCreateIcon}
          globalPrimaryIcon={globalPrimaryIcon}
          globalPrimaryItemHref="//www.atlassian.com/software/confluence"
          globalSearchIcon={globalSearchIcon}
          globalSecondaryActions={[notificationsMenu, appSwitcherMenu, helpMenu, userMenu]}
          isOpen={this.state.isOpen}
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
            <Button>
          Raise feedback
         </Button>
            <h1>Activity</h1>
            <br />
            <Button>
         Create Space
         </Button>
            <br />
            <h4>All updates</h4>
            <br />
            <Lorem count="5" />
          </GridColumn>
        </Grid>
      </Page>
    );
  }
}
