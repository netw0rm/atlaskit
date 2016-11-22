import React from 'react';
import presences from './internal/icons';

/* eslint-disable react/prop-types */
export default (props) => {
  if (props.children) {
    return props.children;
  }
  const PresenceToDisplay = presences[props.presence] || presences.none;

  return (<PresenceToDisplay />);
};
