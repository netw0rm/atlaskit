import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import ArrowLeftIcon from '@atlaskit/icon/glyph/arrow-left';

import {
  AkContainerTitle,
  AkNavigationItem,
  AkContainerNavigationNested,
} from '../../../../src/index';
import nucleusLogo from '../../../nucleus.png';
import BasicNavigation from '../../BasicNavigation';
import HtmlPage from '../../HtmlPage';
import service from './service';

const RouterNavItem = (props) => {
  const { href, ...itemProps } = props;
  return (
    <Link to={href} style={{ textDecoration: 'inherit', color: 'inherit' }}>
      <AkNavigationItem {...itemProps} />
    </Link>
  );
};

const createNavLinkToRoute = ({ icon, path, title }, currentPath) => (
  <RouterNavItem
    href={path}
    icon={icon}
    isSelected={path === currentPath}
    key={path}
    text={title}
  />
);

class ReactRouterNestedNavigation extends Component {
  state = {
    content: null,
    isLoading: false,
    parentRoute: null,
    stack: [[]],
  }

  componentWillMount() {
    this.resolveRoute(this.props.location.pathname);
  }

  componentWillReceiveProps(newProps) {
    this.resolveRoute(newProps.location.pathname);
  }

  getContainerHeaderComponent = () => {
    const { parentRoute } = this.state;
    const backButton = parentRoute ? (
      <RouterNavItem
        href={parentRoute}
        icon={<ArrowLeftIcon label="Back" />}
        text="Back"
      />
    ) : null;

    return [
      (<AkContainerTitle
        href="#/"
        icon={
          <img alt="nucleus" src={nucleusLogo} />
        }
        text="AtlasKit"
        subText="Is the king"
      />),
      backButton,
    ];
  }

  cachedRoutes = {} // eslint-disable-line react/sort-comp

  getCachedRouteData = (pathname) => new Promise((resolve) => {
    if (this.cachedRoutes[pathname]) {
      return resolve(this.cachedRoutes[pathname]);
    }

    return Promise.all([
      service.getRouteContent(pathname),
      service.getRouteAncestors(pathname),
    ]).then((data) => {
      this.cachedRoutes[pathname] = data;
      resolve(data);
    });
  })

  resolveRoute = (pathname) => {
    this.setState({ isLoading: true });
    this.getCachedRouteData(pathname).then(([content, ancestors]) => {
      if (!content) {
        this.setState({ content, isLoading: false, parentRoute: null, stack: [[]] });
        return;
      }

      const ancestorMenus = ancestors && ancestors.length ? ancestors.map(
        ancestor => ancestor.children.map(
          route => createNavLinkToRoute(route, pathname)
        )
      ) : null;
      const childMenu = content.children && content.children.length ? content.children.map(
        route => createNavLinkToRoute(route, pathname)
      ) : null;

      const stack = [];
      if (ancestorMenus) stack.push(...ancestorMenus);
      if (childMenu) stack.push(childMenu);

      const parentRoute = (() => {
        if (stack.length < 2) {
          return null;
        }
        if (childMenu) {
          return ancestors[ancestors.length - 1].path;
        }
        return ancestors[ancestors.length - 2].path;
      })();

      this.setState({ content, isLoading: false, parentRoute, stack });
    });
  }

  renderContent = () => {
    const { content, isLoading } = this.state;
    if (isLoading) {
      return <p>Loading...</p>;
    }
    if (!content) {
      return <h1>404</h1>;
    }
    return (
      <div>
        <h1>{content.title}</h1>
        <p>Lorem ipsum</p>
      </div>
    );
  }

  render() {
    return (
      <HtmlPage content={this.renderContent()}>
        <BasicNavigation
          containerHeaderComponent={this.getContainerHeaderComponent}
        >
          <AkContainerNavigationNested stack={this.state.stack} />
        </BasicNavigation>
      </HtmlPage>
    );
  }
}

export default withRouter(ReactRouterNestedNavigation);
