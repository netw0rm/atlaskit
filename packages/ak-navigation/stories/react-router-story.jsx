import { storiesOf } from '@kadira/storybook';
import React, { PropTypes } from 'react';
import Lorem from 'react-lorem-component';
import { Router, Route, Link, browserHistory } from 'react-router';
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
  router: PropTypes.object,
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

const PageNavigation = () => (
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

const TitledPage = props => (
  <Page>
    <PageNavigation />
    <div>
      <h1>{props.title}</h1>
      <Lorem count="30" />
    </div>
  </Page>
);

TitledPage.propTypes = {
  title: PropTypes.string,
};

function makePage(title) {
  return () => <TitledPage title={title} />;
}

storiesOf(name, module)
  .add('with react-router', () => (
    <Router history={browserHistory}>
      <Route path="/iframe.html" component={makePage('Container home')} />
      <Route path="/page1" component={makePage('Page 1')} />
      <Route path="/page2" component={makePage('Page 2')} />
      <Route path="/page3" component={makePage('Page 3')} />
      <Route path="/page4" component={makePage('Page 4')} />
    </Router>
  )
);
