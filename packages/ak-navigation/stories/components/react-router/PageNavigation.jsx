import React, { PureComponent } from 'react';
import { AtlassianIcon } from 'ak-icon';
import { Link } from 'react-router';
import Navigation, { AkGlobalItem } from '../../../src/index';
import RouterHeader from './RouterHeader';
import RouterLinkItem from './RouterLinkItem';

export default class PageNavigation extends PureComponent {
  render() {
    return (
      <Navigation
        globalPrimaryItem={
          <Link
            to="/iframe.html"
          >
            <AkGlobalItem size="large">
              <AtlassianIcon size="medium" />
            </AkGlobalItem>
          </Link>
        }
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
