import { storiesOf } from '@kadira/storybook';
import React, { PropTypes } from 'react';
import Lorem from 'react-lorem-component';
import { Router, Route, Link, browserHistory, routerShape } from 'react-router';
import Navigation, { AkContainerHeader, AkContainerItem } from '../src/index';
import Page from './components/Page';
import nucleusLogo from './nucleus.png';
import { name } from '../package.json';

const RouterLink = (props, context) => (
  <Link
    to={props.to}
  >
    <AkContainerItem
      text={props.text}
      isSelected={context.router.isActive(props.to, true)}
    />
  </Link>
);

RouterLink.propTypes = {
  to: PropTypes.string,
  text: PropTypes.string,
};

RouterLink.contextTypes = {
  router: routerShape,
};

const RouterHeader = props => (
  <Link
    to={props.to}
  >
    <AkContainerHeader
      text={'AtlasCat'}
      icon={<img alt="nucleus" src={nucleusLogo} />}
    />
  </Link>
);

RouterHeader.propTypes = {
  to: PropTypes.string,
};

RouterLink.contextTypes = {
  router: routerShape,
};

const PageNavigation = props => (
  <Navigation
    containerHeader={
      <RouterHeader
        to={'/iframe.html'}
        activeRoute={props.route}
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
  </Navigation>
);

PageNavigation.propTypes = {
  route: routerShape,
};

const Page1 = props => (
  <Page>
    <PageNavigation route={props.route} />
    <div>
      <h1>Page 1</h1>
      <Lorem count="30" />
    </div>
  </Page>
);

Page1.propTypes = {
  route: routerShape,
};

const Page2 = props => (
  <Page>
    <PageNavigation route={props.route} />
    <div>
      <h1>Page 2</h1>
      <Lorem count="30" />
    </div>
  </Page>
);

Page2.propTypes = {
  route: routerShape,
};
const ContainerHome = props => (
  <Page>
    <PageNavigation route={props.route} />
    <div>
      <h1>Container home</h1>
      <Lorem count="30" />
    </div>
  </Page>
);

ContainerHome.propTypes = {
  route: routerShape,
};

storiesOf(name, module)
  .add('with react-router', () => (
    <Router history={browserHistory}>
      <Route path="/iframe.html" component={ContainerHome} />
      <Route path="/page1" component={Page1} />
      <Route path="/page2" component={Page2} />
    </Router>
  )
);
