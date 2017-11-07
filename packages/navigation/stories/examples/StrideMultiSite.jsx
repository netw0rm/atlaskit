import { action } from '@kadira/storybook';
import AddIcon from '@atlaskit/icon/glyph/add';
import { DropdownItemGroup, DropdownItem } from '@atlaskit/dropdown-menu';
import Avatar from '@atlaskit/avatar';
import Button from '@atlaskit/button';
import AKInlineDialog from '@atlaskit/inline-dialog';
import Lorem from 'react-lorem-component';
import ToolTip from '@atlaskit/tooltip';
import LobbyIcon from '@atlaskit/icon/glyph/bullet-list';
import Navigation, {
  AkContainerNavigationNested,
  AkNavigationItemGroup,
  AkNavigationItem,
  AkGlobalItem,
} from '../../src/index';
import Page, { Grid, GridColumn } from '@atlaskit/page';
import QuestionCircleIcon from '@atlaskit/icon/glyph/question-circle';
import React, { PureComponent } from 'react';
import SearchIcon from '@atlaskit/icon/glyph/search';
import SettingsIcon from '@atlaskit/icon/glyph/settings';
import SelectableDropdownMenu from '../components/SelectableDropdownMenu';
import SiteSelectorMenu from './SiteSelectorMenu';
import {
  akColorN20 as defaultColor,
} from '@atlaskit/util-shared-styles';

const globalPrimaryIcon = (
  <ToolTip
    position="right"
    description="Active Site"
  >
    <Avatar
      appearance="square"
      name="Active Site"
      enableTooltip={false}
    />
  </ToolTip>
);

const userIcon = (
  <div
    style={{
      flex: 'auto',
      height: 36,
    }}
  >
    <AKInlineDialog
      isOpen={false}
      position="bottom left"
    >
      <Button
        style={{ height: 36 }}
        appearance="subtle"
        isSelected={false}
        shouldFitContainer
      >
        <span
          style={{
            display: 'flex',
            alignItems: 'center',
          }}
        >
          <Avatar
            size="small"
            borderColor={defaultColor}
            presenceState="online"
          />
          <span style={{ marginLeft: 5 }}>Available</span>
        </span>
      </Button>
    </AKInlineDialog>
  </div>
);

const rooms = Array.from('x'.repeat(10));

export default class StrideMultiSite extends PureComponent {
  constructor(...args) {
    super(...args);
    this.state = {
      isOpen: true,
      menuLoading: true,
      openDrawer: null,
      stack: [
        [
          <AkNavigationItemGroup isCompact>
            <AkNavigationItem
              isCompact
              isSelected={false}
              icon={<LobbyIcon label="Directory" />}
              text="Directory"
            />
          </AkNavigationItemGroup>,
          <AkNavigationItemGroup
            isCompact
            title="Rooms"
          >
            {
              rooms.map((r, index) =>
                <AkNavigationItem
                  isCompact
                  key={index}
                  icon={
                    <Avatar
                      appearance="square"
                      size="small"
                      borderColor={defaultColor}
                    />
                  }
                  text={`Room ${index}`}
                />
              )
            }
          </AkNavigationItemGroup>,
        ],
      ],
      width: this.props.width,
    };
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
  };

  render() {
    const globalCreateIcon = (
      <ToolTip position="right" description="Create">
        <AddIcon label="Create icon" secondaryColor="inherit" size="medium" />
      </ToolTip>
    );

    const globalSearchIcon = (
      <ToolTip position="right" description="Search">
        <SearchIcon label="Search icon" secondaryColor="inherit" size="medium" />
      </ToolTip>
    );

    const helpMenu = (
      <SelectableDropdownMenu
        appearance="tall"
        position="right bottom"
        trigger={isOpen => (
          <AkGlobalItem href="" isSelected={isOpen}>
            <ToolTip position="right" description="Help">
              <QuestionCircleIcon
                label="Help icon"
                secondaryColor="inherit"
                size="medium"
              />
            </ToolTip>
          </AkGlobalItem>
        )}
      >
        <DropdownItemGroup title="HELP">
          <DropdownItem>Help & support</DropdownItem>
          <DropdownItem>Mobile & Desktop apps</DropdownItem>
          <DropdownItem>Get started</DropdownItem>
          <DropdownItem>Release notes</DropdownItem>
          <DropdownItem>Stride admin</DropdownItem>
          <DropdownItem>Stride API</DropdownItem>
          <DropdownItem>Stride Status</DropdownItem>
          <DropdownItem>Blog</DropdownItem>
          <DropdownItem>About</DropdownItem>
        </DropdownItemGroup>
      </SelectableDropdownMenu>
    );

    const siteTwo = (
      <div style={{ marginBottom: 8 }}>
        <ToolTip
          position="right"
          description="Site Two"
        >
          <Avatar
            appearance="square"
            name="Site Two"
            enableTooltip={false}
          />
        </ToolTip>
      </div>
    );

    const siteThree = (
      <div style={{ marginBottom: 8 }}>
        <ToolTip
          position="right"
          description="Site Three"
        >
          <Avatar
            appearance="square"
            name="Site Three"
            enableTooltip={false}
          />
        </ToolTip>
      </div>
    );

    const settingsMenu = (
      <AkGlobalItem href="//">
        <SettingsIcon label="Settings" size="medium" />
      </AkGlobalItem>
    );

    return (
      <Page
        navigation={
          <Navigation
            containerHeaderComponent={() => userIcon}
            globalCreateIcon={globalCreateIcon}
            globalPrimaryIcon={globalPrimaryIcon}
            globalPrimaryIconAppearance="square"
            globalPrimaryItemHref="//"
            globalSearchIcon={globalSearchIcon}
            globalSecondaryActions={[
              siteTwo,
              siteThree,
              <SiteSelectorMenu />,
              settingsMenu,
              helpMenu,
            ]}
            isOpen={this.state.isOpen}
            width={this.state.width}
            hasScrollHintTop
            isCollapsible={false}
          >
            <AkContainerNavigationNested
              stack={this.state.stack}
            />
          </Navigation>
        }
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
