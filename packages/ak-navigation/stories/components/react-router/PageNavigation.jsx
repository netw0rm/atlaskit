import React, { PureComponent } from 'react';
import { AtlassianIcon } from 'ak-icon';
import Navigation from '../../../src/index';
import RouterHeader from './RouterHeader';
import RouterLinkComponent from './RouterLinkComponent';
import RouterLinkItem from './RouterLinkItem';

export default class PageNavigation extends PureComponent {
  render() {
    return (
      <Navigation
        globalPrimaryIcon={<AtlassianIcon label="Home" size="medium" />}
        globalPrimaryItemHref="/iframe.html"
        linkComponent={RouterLinkComponent}
        containerHeader={
          <RouterHeader
            to="/iframe.html"
          />
        }
      >
        <RouterLinkItem
          to="/page1"
          text="Page 1"
        />
        <RouterLinkItem
          to="/page2"
          text="Page 2"
        />
        <RouterLinkItem
          to="/page3"
          text="Page 3"
        />
        <RouterLinkItem
          to="/page4"
          text="Page 4"
        />
      </Navigation>
    );
  }
}
