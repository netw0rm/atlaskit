import { storiesOf } from '@kadira/storybook';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import DashboardIcon from '@atlaskit/icon/glyph/dashboard';
import {
  presetThemes,
  AkCollapseOverflowItemGroup,
  AkCollapseOverflowItem,
} from '@atlaskit/navigation';
import { AkNavigationItem, AkNavigationItemGroup, AkCollapseOverflow } from '../src/index';
import HtmlPage from './components/HtmlPage';
import BasicNavigation from './components/BasicNavigation';
import { name } from '../package.json';

const manyNavigationItems = (itemCount = 40) => {
  const items = [];
  for (let i = 0; i < itemCount; i++) {
    items.push(
      <AkCollapseOverflowItem overflowItemIndex={i}>
        <AkNavigationItem
          href={`#${i}`}
          key={i}
          text={`${i} Test page`}
          icon={<DashboardIcon size="medium" label="" />}
        />
      </AkCollapseOverflowItem>
    );
  }
  return items;
};

const manyNavigationItemGroups = (groupCount = 1, itemsPerGroup = 40) => {
  const groups = [];
  for (let i = 0; i < groupCount; i++) {
    groups.push(
      <AkCollapseOverflowItemGroup itemCount={itemsPerGroup} overflowGroupIndex={i}>
        <AkNavigationItemGroup title={`Group ${i}`}>
          {manyNavigationItems(itemsPerGroup)}
        </AkNavigationItemGroup>
      </AkCollapseOverflowItemGroup>
    );
  }
  return groups;
};

class NavWithOverflow extends Component {
  static propTypes = {
    children: PropTypes.node,
  }

  state = {
    isNavOpen: false,
  }

  onNavResize = ({ isOpen }) => {
    this.setState({ isNavOpen: isOpen });
  }

  render() {
    const { children, ...otherProps } = this.props;
    return (
      <HtmlPage
        content={
          <p>
            <strong>Usage note:</strong> AkCollapseOverflow should only be used when the Navigation
            is in a collapsed state. Its direct children should be either AkNavigationItem or
            AkNavigationItemGroup.
          </p>
        }
      >
        <BasicNavigation
          onResizeCallback={this.onNavResize}
          defaultOpen={false}
          {...otherProps}
        >
          {
            this.state.isNavOpen ? children : (
              <AkCollapseOverflow groupCount={React.Children.count(children)}>
                {children}
              </AkCollapseOverflow>
            )
          }
        </BasicNavigation>
      </HtmlPage>
    );
  }
}

storiesOf(name, module)
  .add('with container overflow to dropdown', () => (
    <NavWithOverflow>
      <AkCollapseOverflowItemGroup itemCount={40} overflowGroupIndex={0}>
        <AkNavigationItemGroup>
          {manyNavigationItems(40)}
        </AkNavigationItemGroup>
      </AkCollapseOverflowItemGroup>
    </NavWithOverflow>
  ))
  .add('with container overflow to dropdown with groups', () => (
    <NavWithOverflow>
      {manyNavigationItemGroups(15, 3)}
    </NavWithOverflow>
  ))
  .add('with container overflow in a themed navigation', () => (
    <NavWithOverflow containerTheme={presetThemes.global}>
      {manyNavigationItemGroups(15, 3)}
    </NavWithOverflow>
  ))
  .add('with container overflow to dropdown going off page', () => (
    <NavWithOverflow containerHeaderComponent={null}>
      <AkCollapseOverflowItemGroup itemCount={40} overflowGroupIndex={0}>
        <AkNavigationItemGroup>{manyNavigationItems(40)}</AkNavigationItemGroup>
      </AkCollapseOverflowItemGroup>
    </NavWithOverflow>
  ));
