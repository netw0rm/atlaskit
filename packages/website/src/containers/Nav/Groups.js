/* eslint-disable react/prop-types */

import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Route, matchPath } from 'react-router-dom';

import ArrowLeftIcon from '@atlaskit/icon/glyph/arrow-left';
import { AkContainerNavigationNested as NestedNav } from '@atlaskit/navigation';

import DefaultNav from './navigations/Default';
import ComponentNav from './navigations/Component';
import NavigationNav from './navigations/NavigationComponent';

import { RouterNavigationItem } from './linkComponents';

export default class Groups extends PureComponent {
  static contextTypes = {
    router: PropTypes.object,
  }

  state = {
    parentRoute: null,
    stack: [[]],
  }

  componentWillMount() {
    this.resolveRoutes(this.context.router.route.location.pathname);
  }

  componentWillReceiveProps(nextProps, nextContext) {
    this.resolveRoutes(nextContext.router.route.location.pathname);
  }

  resolveRoutes(pathname) {
    const menus = [
      <Route path="/">
        <DefaultNav pathname={pathname} />
      </Route>,
      <Route path="/components">
        <ComponentNav pathname={pathname} />
      </Route>,
      <Route path="/changelog">
        <ComponentNav pathname={pathname} />
      </Route>,
      <Route path="/components/navigation">
        <NavigationNav pathname={pathname} />
      </Route>,
    ];

    const stack = menus
      .filter(menu => matchPath(pathname, menu.props))
      .map(menu => [
        React.cloneElement(menu, { key: menu.props.path }),
      ]);

    const parentRoute = stack.length > 1 ? stack[stack.length - 2][0].props.path : null;

    this.setState({ parentRoute, stack });
  }

  render() {
    return (
      <div>
        {this.state.parentRoute ? (
          <div style={{ marginBottom: '10px' }}>
            <RouterNavigationItem
              href={this.state.parentRoute}
              icon={<ArrowLeftIcon label="Back" />}
              text="Back"
            />
          </div>
        ) : null}
        <NestedNav stack={this.state.stack} />
      </div>
    );
  }
}
