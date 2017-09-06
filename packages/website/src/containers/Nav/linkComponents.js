import React from 'react';
import { Link } from 'react-router-dom';
import { AkNavigationItem } from '@atlaskit/navigation';

// eslint-disable-next-line react/prop-types
const RouterLink = ({ children, href, ...otherProps }) => (
  <Link to={href} {...otherProps} style={{ color: 'inherit' }}>
    {children}
  </Link>
);

export const RouterNavigationItem = props => (
  <AkNavigationItem linkComponent={RouterLink} {...props} />
);

export const ExternalNavigationItem = props => (
  <AkNavigationItem {...props} target="_new" />
);
