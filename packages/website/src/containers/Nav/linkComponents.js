import React from 'react';
import { Link } from 'react-router-dom';
import { AkNavigationItem as NavigationItem } from '@atlaskit/navigation';

/* eslint-disable react/prop-types */
export const RouterNavigationItem = (props) => {
  const { href, ...navItemProps } = props;
  return (
    <Link to={href} style={{ textDecoration: 'none' }}>
      <NavigationItem {...navItemProps} />
    </Link>
  );
};

export const ExternalNavigationItem = (props) => {
  const { href, ...navItemProps } = props;
  return (
    <a href={href} style={{ textDecoration: 'none' }} target="_new">
      <NavigationItem {...navItemProps} />
    </a>
  );
};
