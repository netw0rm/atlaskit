/* eslint-disable react/prop-types */

import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import Navigation, {
  AkContainerItem as NavItem,
  AkContainerTitle as NavTitle,
  AkContainerItemGroup as NavItemGroup,
  AkSearchDrawer,
} from '@atlaskit/navigation';

import ArrowleftIcon from '@atlaskit/icon/glyph/arrow-left';
import AtlassianIcon from '@atlaskit/icon/glyph/atlassian';
import SearchIcon from '@atlaskit/icon/glyph/search';

import reactIcon from '../images/react-256.jpg';
import data from '../data';
import SearchDrawer from '../components/SearchDrawer';

const atlaskitComponentKeys = Object.keys(data);
const externalLinks = [
  ['https://bitbucket.org/atlassian/atlaskit', 'Bitbucket repo'],
  ['https://ecosystem.atlassian.net/browse/AK', 'JIRA project'],
];
const Header = () => (
  <Link to="/">
    <NavTitle
      icon={<img alt="nucleus" src={reactIcon} />}
      text="AtlasKit"
    />
  </Link>
);

export default class App extends PureComponent {
  static contextTypes = {
    navOpenState: PropTypes.object,
    router: PropTypes.object,
  };

  state = { openDrawer: false }

  openDrawer = openDrawer => this.setState({ openDrawer })

  render() {
    const backIcon = <ArrowleftIcon label="Back icon" size="small" />;
    const globalPrimaryIcon = <AtlassianIcon label="Atlassian icon" size="medium" />;

    return (
      <Navigation
        containerHeaderComponent={Header}
        drawerBackIcon={<ArrowleftIcon label="Back icon" size="medium" />}
        drawers={[(
          <AkSearchDrawer
            backIcon={backIcon}
            isOpen={this.props.isSearchDrawerOpen}
            key="search"
            onBackButton={() => this.props.onSearchDrawerToggle(false)}
            primaryIcon={globalPrimaryIcon}
          >
            <SearchDrawer
              onResultClicked={() => this.props.onSearchDrawerToggle(false)}
              onSearchInputRef={(ref) => {
                this.searchInputRef = ref;
              }}
            />
          </AkSearchDrawer>
        )]}
        globalPrimaryIcon={<AtlassianIcon size="medium" label="Atlassian" />}
        globalSearchIcon={<SearchIcon label="Search icon" />}
        hasBlanket
        isOpen={this.props.isNavigationOpen}
        isResizeable={false}
        onResize={this.props.onNavResize}
        onSearchDrawerOpen={() => {
          this.props.onSearchDrawerToggle(true);
          if (this.searchInputRef) {
            this.searchInputRef.focus();
          }
        }}
        openDrawer={this.state.openDrawer}
        width={this.props.navigationWidth}
      >
        <NavItemGroup title="Components">
          {atlaskitComponentKeys.map((key) => {
            const component = data[key];
            const url = `/components/${key}`;
            return (
              <Link to={url} key={key}>
                <NavItem
                  text={component.name}
                  // isSelected={this.context.router.isActive(url, true)}
                />
              </Link>
            );
          })}
        </NavItemGroup>
        <NavItemGroup title="Resources">
          {externalLinks.map(([url, title]) => (
            <a key={url} href={url} target="_new">
              <NavItem
                text={title}
                // isSelected={this.context.router.isActive(url, true)}
              />
            </a>
          ), this)}
        </NavItemGroup>
      </Navigation>
    );
  }
}
