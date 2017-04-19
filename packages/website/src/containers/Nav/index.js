/* eslint-disable react/prop-types */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link, withRouter } from 'react-router-dom';

import Navigation, {
  AkContainerItem as NavItem,
  AkContainerTitle as NavTitle,
  AkContainerItemGroup as NavItemGroup,
  AkGlobalItem as GlobalItem,
  AkSearchDrawer,
} from '@atlaskit/navigation';

import Dropdown from '@atlaskit/dropdown-menu';

import ArrowLeft from '@atlaskit/icon/glyph/arrow-left';
import AtlassianIcon from '@atlaskit/icon/glyph/atlassian';
import CodeIcon from '@atlaskit/icon/glyph/code';
import ComponentIcon from '@atlaskit/icon/glyph/component';
import GlobeIcon from '@atlaskit/icon/glyph/world';
import InstallIcon from '@atlaskit/icon/glyph/overview';
import SearchIcon from '@atlaskit/icon/glyph/search';
import QuestionCircle from '@atlaskit/icon/glyph/question-circle';
import BitbucketIcon from '@atlaskit/icon/glyph/bitbucket';
import JiraIcon from '@atlaskit/icon/glyph/jira';
import DotIcon from '@atlaskit/icon/glyph/hipchat/media-attachment-count';

import reactIcon from '../../images/atlaskit-logo.png';
import data from '../../data';
import SearchDrawer from './SearchDrawer';
import Groups from './Groups';

const atlaskitComponentKeys = Object.keys(data);
const externalLinks = [
  ['https://bitbucket.org/atlassian/atlaskit', 'Bitbucket repo', BitbucketIcon],
  ['https://ecosystem.atlassian.net/browse/AK', 'JIRA project', JiraIcon],
];
const getStartedLinks = [
  ['/install', 'Install Guide', InstallIcon],
  ['/examples', 'Examples', CodeIcon],
];
const Header = () => (
  <Link to="/">
    <NavTitle
      icon={<img alt="nucleus" src={reactIcon} />}
      text="AtlasKit"
    />
  </Link>
);

export default class Nav extends Component {
  static contextTypes = {
    router: PropTypes.object,
  };

  render() {
    const { router } = this.context;
    const { pathname } = router.route.location;
    const backIcon = <ArrowLeft label="Back icon" size="small" />;
    const globalPrimaryIcon = <AtlassianIcon label="Atlassian icon" size="medium" />;

    return (
      <Navigation
        containerHeaderComponent={Header}
        drawerBackIcon={<ArrowLeft label="Back icon" size="medium" />}
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
              onSearchInputRef={r => (this.searchInputRef = r)}
            />
          </AkSearchDrawer>
        )]}
        globalPrimaryIcon={<AtlassianIcon size="large" label="Atlassian" />}
        globalSearchIcon={<SearchIcon label="Search icon" />}
        isResizeable={false}
        onSearchDrawerOpen={() => {
          this.props.onSearchDrawerToggle(true);
          if (this.searchInputRef) {
            this.searchInputRef.focus();
          }
        }}
        // openDrawer={this.props.openDrawer}
        width={this.props.navigationWidth}
      >
        <Groups
          ref={r => (this.nest = r)}
          selectedIndex={pathname.substr(0, 11) === '/components' ? 1 : 0}
        >
          <div>
            <NavItemGroup>
              <Link to="/">
                <NavItem
                  icon={<GlobeIcon label="Welcome icon" />}
                  text="Welcome"
                  // isSelected={this.context.router.isActive(url, true)}
                />
              </Link>
              <NavItem
                icon={<ComponentIcon label="Components icon" />}
                onClick={() => {
                  router.history.push('/components');
                  this.nest.goToNext();
                }}
                text="Components"
              />
            </NavItemGroup>
            <NavItemGroup title="Get Started">
              {getStartedLinks.map(([path, title, Icon]) => (
                <Link key={path} to={path}>
                  <NavItem
                    icon={<Icon label={title} />}
                    text={title}
                    // isSelected={this.context.router.isActive(url, true)}
                  />
                </Link>
              ), this)}
            </NavItemGroup>
            <NavItemGroup title="Resources">
              {externalLinks.map(([url, title, Icon]) => (
                <a key={url} href={url} target="_new">
                  <NavItem
                    icon={<Icon label={title} />}
                    text={title}
                    // isSelected={this.context.router.isActive(url, true)}
                  />
                </a>
              ), this)}
            </NavItemGroup>
          </div>
          <div>
            <NavItem
              icon={backIcon}
              onClick={() => router.history.push('/')}
              text="Back"
            />
            <NavItem
              icon={<ComponentIcon label="Components icon" />}
              onClick={() => router.history.push('/components')}
              text="All Components"
              isSelected={pathname === '/components'}
            />
            <NavItemGroup title="Components">
              {atlaskitComponentKeys.map((key) => {
                console.log(`Recreating ComponentNavItem for ${key}`);
                return (
                  <ComponentNavItem
                    componentKey={key}
                    key={key}
                    pathname={pathname}
                  />
                );
              })}
            </NavItemGroup>
          </div>
        </Groups>
      </Navigation>
    );
  }
}

const ComponentNavItem = withRouter(({ componentKey, location }) => {
  const component = data[componentKey];
  const url = `/components/${componentKey}`;
  const isSelected = location.pathname === url;
  console.log(`${componentKey} : ${url} : ${isSelected}`);

  return (
    <Link to={url} key={componentKey}>
      <NavItem
        icon={<DotIcon size="small" label={`${component.name} icon`} />}
        text={component.name}
        isSelected={isSelected}
      />
    </Link>
  );
});
