/* eslint-disable react/prop-types */

import React from 'react';

const ButtonWrapper = props => {
  const style = {
    alignSelf: 'center',
    display: 'inline-flex',
    flexWrap: 'nowrap',
    maxWidth: '100%',
  };
  if (props.fit) {
    style.width = '100%';
    style.justifyContent = 'center';
  }
  return <span style={style}>{props.children}</span>;
};

export default ButtonWrapper;
