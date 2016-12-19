import React, { PureComponent } from 'react';
import { AtlassianIcon } from 'ak-icon';
import Navigation, { AkGlobalItem } from '../../../src/index';
import RouterHeader from './RouterHeader';
import RouterLink from './RouterLink';

export default class PageNavigation extends PureComponent {
  render() {
    return (
      <Navigation
        globalPrimaryItem={
          <RouterLink
            to={'/iframe.html'}
            text={
              <AkGlobalItem size="large">
                <AtlassianIcon size="medium" />
              </AkGlobalItem>
            }
          />
        }
        containerHeader={
          <RouterHeader
            to={'/iframe.html'}
          />
        }
      >
        <RouterLink
          to={'/page1'}
          text={'Page 1'}
        />
        <RouterLink
          to={'/page2'}
          text={'Page 2'}
        />
        <RouterLink
          to={'/page3'}
          text={'Page 3'}
        />
        <RouterLink
          to={'/page4'}
          text={'Page 4'}
        />
      </Navigation>
    );
  }
}
