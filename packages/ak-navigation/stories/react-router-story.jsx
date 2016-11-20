import { storiesOf } from '@kadira/storybook';
import React from 'react';
import Lorem from 'react-lorem-component';
import { Router, Route, Link, browserHistory } from 'react-router';
import Navigation, { ContainerHeader, ContainerItem } from '../src/index';
import Page from './components/Page';
import nucleusLogo from './nucleus.png';

const PageNavigation = () => (
  <Navigation
    containerHeader={
      <ContainerHeader
        link={<Link to="/iframe.html">Honey Badger Systems™</Link>}
        logo={<img alt="cat" src={nucleusLogo} />}
      />
    }
  >
    <ContainerItem
      link={<Link to="/page1">Page 1</Link>}
    />
    <ContainerItem
      link={<Link to="/page2">Page 2</Link>}
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
