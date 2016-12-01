import React, { PureComponent } from 'react';
import Navigation from '../../../src/index';
import RouterHeader from './RouterHeader';
import RouterLink from './RouterLink';


// eslint-disable-next-line react/prefer-stateless-function
export default class PageNavigation extends PureComponent {
  render() {
    return (
      <Navigation
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
