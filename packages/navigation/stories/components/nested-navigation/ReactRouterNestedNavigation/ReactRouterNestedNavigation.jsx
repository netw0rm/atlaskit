/**
 * This is the layer which maps react-router functionality
 * to an AkContainerNestedNavigation stack
 */

import React, { Component } from 'react';
import { matchPath, withRouter } from 'react-router-dom';

import { AkContainerNavigationNested } from '../../../../src/index';

class ReactRouterNestedNavigationBase extends Component {
  render() {
    const { children, location } = this.props;
    const stack = React.Children.toArray(children).filter(
      route => matchPath(location.pathname, route.props.path)
    );
    return <AkContainerNavigationNested stack={stack} />;
  }
}

export default withRouter(ReactRouterNestedNavigationBase);
