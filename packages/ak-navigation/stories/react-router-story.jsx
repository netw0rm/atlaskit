import { storiesOf } from '@kadira/storybook';
import React from 'react';
import Lorem from 'react-lorem-component';
import { Router, Route, Link, browserHistory } from 'react-router';
import Navigation, { ContainerHeader, ContainerItem } from '../src/index';
import Page from './components/Page';
import nucleusLogo from './nucleus.png';

const reactRouterLinkComponent = (url, children) => <Link to={url}>{children}</Link>;

const PageNavigation = () => (
  <Navigation
    containerHeader={
      <ContainerHeader
        text={'AtlasCat'}
        url={'/iframe.html'}
        logo={<img alt="nucleus" src={nucleusLogo} />}
        linkComponent={reactRouterLinkComponent}
      />
    }
  >
    <ContainerItem
      text={'Page 1'}
      url={'/page1'}
      linkComponent={reactRouterLinkComponent}
    />
    <ContainerItem
      text={'Page 2'}
      url={'/page2'}
      linkComponent={reactRouterLinkComponent}
    />
  </Navigation>
);
const Page1 = () => (
  <Page>
    <PageNavigation />
    <div>
      <h1>Page 1</h1>
      <Lorem count="30" />
    </div>
  </Page>
);
const Page2 = () => (
  <Page>
    <PageNavigation />
    <div>
      <h1>Page 2</h1>
      <Lorem count="30" />
    </div>
  </Page>
);
const ContainerHome = () => (
  <Page>
    <PageNavigation />
    <div>
      <h1>Container home</h1>
      <Lorem count="30" />
    </div>
  </Page>
);

storiesOf(name, module)
  .add('with react-router', () => (
    <Router history={browserHistory}>
      <Route path="/iframe.html" component={ContainerHome} />
      <Route path="/page1" component={Page1} />
      <Route path="/page2" component={Page2} />
    </Router>
  )
);
