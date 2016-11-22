import React from 'react';
import DefaultAvatar from './internal/default-avatar';

/* eslint-disable react/prop-types */
export default (props) => {
  if (!props.loading) {
    if (!props.src || props.error) {
      return (<DefaultAvatar {...props} />);
    }
  }

  const imgProps = Object.assign({}, props);
  delete imgProps.error;
  delete imgProps.loading;

  // we deliberately insert the alt prop knowing it will get overwritten by ...props because all
  // img tags should either have an alt or role="presentation"
  return (<img alt={props.alt} {...imgProps} />);
};
