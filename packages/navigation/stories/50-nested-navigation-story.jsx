import { storiesOf } from '@kadira/storybook';
import React from 'react';
import { BrowserRouter, HashRouter } from 'react-router-dom';

import BasicNestedNavigation from './components/nested-navigation/BasicNestedNavigation';
import LazyLoadNestedNavigation from './components/nested-navigation/LazyLoadNestedNavigation';
import NestedNavigationWithDrawers from './components/nested-navigation/NestedNavigationWithDrawers';
import ReactRouterNestedNavigation from './components/nested-navigation/ReactRouterNestedNavigation';
import NestedNavigationRouterLazyLoad from './components/nested-navigation/NestedNavigationRouterLazyLoad';
import { name } from '../package.json';

storiesOf(`${name}/NestedNavigation`, module)
  .add('with basic nested navigation', () => (
    <BasicNestedNavigation />
  ))
  .add('nested navigation with lazy-load', () => (
    <LazyLoadNestedNavigation />
  ))
  .add('nested navigation with react-router', () => (
    <BrowserRouter><ReactRouterNestedNavigation /></BrowserRouter>
  ))
  .add('tooltip in nested navigation', () => (
    <BasicNestedNavigation withtootips />
  ))
  .add('nested navigation with drawers', () => (
    <NestedNavigationWithDrawers />
  ))
  .add('with react-router and lazy-load', () => (
    <HashRouter><NestedNavigationRouterLazyLoad /></HashRouter>
  )
);
