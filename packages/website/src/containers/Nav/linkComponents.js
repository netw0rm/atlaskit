import React from 'react';
import { Link } from 'react-router-dom';

/* eslint-disable react/prop-types */
export const RouterLinkComponent = (props) => {
  const { children, className, href } = props;
  return <Link className={className} to={href}>{children}</Link>;
};

export const ExternalLinkComponent = (props) => {
  const { children, className, href } = props;
  return <a className={className} href={href} target="_new">{children}</a>;
};
