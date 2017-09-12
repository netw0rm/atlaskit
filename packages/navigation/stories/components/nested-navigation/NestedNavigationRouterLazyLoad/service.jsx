import React from 'react';
import { matchPath } from 'react-router-dom';
import DashboardIcon from '@atlaskit/icon/glyph/dashboard';
import SettingsIcon from '@atlaskit/icon/glyph/settings';
import TrayIcon from '@atlaskit/icon/glyph/tray';

const SERVICE_LATENCY = 1000;

const routes = {
  '/': {
    children: ['/movies', '/albums', '/about'],
    title: 'Home',
  },
  '/movies': {
    children: ['/movies/matrix', '/movies/lotr'],
    icon: <DashboardIcon label="Dashboard" />,
    title: 'Movies',
  },
  '/movies/matrix': {
    icon: <DashboardIcon label="Dashboard" />,
    title: 'The Matrix',
  },
  '/movies/lotr': {
    icon: <DashboardIcon label="Dashboard" />,
    title: 'The Lord of the Rings',
  },
  '/albums': {
    children: ['/albums/coexist', '/albums/anawesomewave', '/albums/more'],
    icon: <SettingsIcon label="Settings" />,
    title: 'Albums',
  },
  '/albums/coexist': {
    icon: <SettingsIcon label="Settings" />,
    title: 'The xx - coexist',
  },
  '/albums/anawesomewave': {
    icon: <SettingsIcon label="Settings" />,
    title: 'Alt J - An Awesome Wave',
  },
  '/albums/more': {
    children: ['/albums/more/lonelyheartsclub', '/albums/more/lonerism'],
    icon: <SettingsIcon label="Settings" />,
    title: 'More Albums',
  },
  '/albums/more/lonelyheartsclub': {
    icon: <SettingsIcon label="Settings" />,
    title: 'The Beatles – Sgt. Peppers Lonely Hearts Club Band',
  },
  '/albums/more/lonerism': {
    icon: <SettingsIcon label="Settings" />,
    title: 'Tame Impala - Lonerism',
  },
  '/about': {
    icon: <TrayIcon label="Projects" />,
    title: 'About',
  },
};

const mockLatency = data => (
  new Promise(
    resolve => setTimeout(() => resolve(data), SERVICE_LATENCY)
  )
);

const hydrateChildren = route => (
  route.children ? ({
    ...route,
    children: route.children.map(
      childRoute => ({ ...routes[childRoute], path: childRoute })
    ),
  }) : route
);

const hydrateAncestors = ancestors => (
  ancestors.map(
    ancestorRoute => ({
      ...hydrateChildren(routes[ancestorRoute]),
      path: ancestorRoute,
    })
  )
);

const getRouteContent = path => mockLatency((() => {
  const route = routes[path];
  if (!route) {
    return null;
  }
  return hydrateChildren(route);
})());

const getRouteAncestors = path => mockLatency(
  (() => {
    if (!routes[path]) {
      return null;
    }
    const ancestors = Object.keys(routes).filter(
      route => matchPath(path, route)
    );
    return ancestors.length > 1
      ? hydrateAncestors(ancestors.slice(0, ancestors.length - 1))
      : null;
  })()
);

export default {
  getRouteContent,
  getRouteAncestors,
};
